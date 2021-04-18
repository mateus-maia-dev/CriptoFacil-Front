import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { ServerJsonApi } from "../../services/api";

const getMonth = (monthParameter) => {
  let split = monthParameter.date.split("-")[1];

  switch (split) {
    case "01":
      return "janeiro";

    case "02":
      return "fevereiro";

    case "03":
      return "março";

    case "04":
      return "abril";

    case "05":
      return "maio";

    case "06":
      return "junho";

    case "07":
      return "julho";

    case "08":
      return "agosto";

    case "09":
      return "setembro";

    case "10":
      return "outubro";

    case "11":
      return "novembro";

    case "12":
      return "dezembro";

    default:
      return "indefinido";
  }
};

export const MyAssetsContext = createContext();

export const MyAssetsProvider = ({ children }) => {
  const [myAssets, setMyAssets] = useState({});
  const [myCoins, setMyCoins] = useState([]);
  const [myTransactions, setMyTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);

  const [mockTransactions, setMockTransactions] = useState([]);

  const token = localStorage.getItem("token");
  const { sub } = jwtDecode(token);

  console.log("mockTransactions", mockTransactions);

  useEffect(() => {
    ServerJsonApi.get(`/transactions?userId=${sub}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      setMockTransactions(response.data);
    });
  }, [token]);

  useEffect(() => {
    let coins = [];
    for (let i in mockTransactions) {
      coins.push(mockTransactions[i].coin);
    }
  }, []);

  useEffect(() => {
    if (apiData !== []) {
      let coins = [];
      for (let i in mockTransactions) {
        coins.push(mockTransactions[i].coin);
      }

      let coinsFilter = coins.filter(
        (item, pos, self) => self.indexOf(item) === pos
      );

      setMyCoins(coinsFilter);

      console.log("coinsFILTER", coinsFilter);

      let myTransactions = {};

      for (let i in coinsFilter) {
        if (myTransactions[coinsFilter[i]] === undefined) {
          myTransactions[coinsFilter[i]] = [];
        }
      }

      for (let i in mockTransactions) {
        for (let j in Object.keys(myTransactions))
          if (mockTransactions[i].coin === Object.keys(myTransactions)[j]) {
            myTransactions[mockTransactions[i].coin].push(mockTransactions[i]);
          }
      }

      setMyTransactions(myTransactions);

      for (let i in coinsFilter) {
        if (myAssets[coinsFilter[i]] === undefined) {
          myAssets[coinsFilter[i]] = {
            accounting: {
              janeiro: {
                profit_loss: [],
                sum_sell: [],
                trades: [],
              },
              fevereiro: {
                profit_loss: [],
                sum_sell: [],
                trades: [],
              },
              março: {
                profit_loss: [],
                sum_sell: [],
                trades: [],
              },
              abril: {
                profit_loss: [],
                sum_sell: [],
                trades: [],
              },
              maio: {
                profit_loss: [],
                sum_sell: [],
                trades: [],
              },
              junho: {
                profit_loss: [],
                sum_sell: [],
                trades: [],
              },
              julho: {
                profit_loss: [],
                sum_sell: [],
                trades: [],
              },
              agosto: {
                profit_loss: [],
                sum_sell: [],
                trades: [],
              },
              setembro: {
                profit_loss: [],
                sum_sell: [],
                trades: [],
              },
              outubro: {
                profit_loss: [],
                sum_sell: [],
                trades: [],
              },
              novembro: {
                profit_loss: [],
                sum_sell: [],
                trades: [],
              },
              dezembro: {
                profit_loss: [],
                sum_sell: [],
                trades: [],
              },
            },
          };
        }
      }

      for (let i in coinsFilter) {
        myAssets[coinsFilter[i]].avg_cost =
          myTransactions[coinsFilter[i]][0].cost;
        myAssets[coinsFilter[i]].sum_qty =
          myTransactions[coinsFilter[i]][0].qty;
      }

      for (let j in coinsFilter) {
        for (let i = 1; i < myTransactions[coinsFilter[j]].length; i++) {
          const monthName = getMonth(myTransactions[coinsFilter[j]][i]);

          if (myTransactions[coinsFilter[j]][i].type === "buy") {
            myAssets[coinsFilter[j]].avg_cost =
              (myAssets[coinsFilter[j]].avg_cost *
                myAssets[coinsFilter[j]].sum_qty +
                myTransactions[coinsFilter[j]][i].cost *
                  myTransactions[coinsFilter[j]][i].qty) /
              (myAssets[coinsFilter[j]].sum_qty +
                myTransactions[coinsFilter[j]][i].qty);

            myAssets[coinsFilter[j]].sum_qty +=
              myTransactions[coinsFilter[j]][i].qty;
          }

          if (myTransactions[coinsFilter[j]][i].type === "sell") {
            myAssets[coinsFilter[j]].sum_qty -=
              myTransactions[coinsFilter[j]][i].qty;

            myAssets[coinsFilter[j]].accounting[monthName].profit_loss.push(
              (myTransactions[coinsFilter[j]][i].cost -
                myAssets[coinsFilter[j]].avg_cost) *
                myTransactions[coinsFilter[j]][i].qty
            );

            myAssets[coinsFilter[j]].accounting[monthName].sum_sell.push(
              myTransactions[coinsFilter[j]][i].cost *
                myTransactions[coinsFilter[j]][i].qty
            );

            if (myTransactions[coinsFilter[j]][i].is_national === false) {
              myAssets[coinsFilter[j]].accounting[monthName].trades.push(
                myTransactions[coinsFilter[j]][i].cost *
                  myTransactions[coinsFilter[j]][i].qty
              );
            }
          }
        }
      }

      setMyAssets(myAssets);
      setLoading(false);
    }
  }, [apiData, mockTransactions, myAssets]);
  if (loading) {
    return <div></div>;
  } else {
    return (
      <>
        <MyAssetsContext.Provider value={{ myCoins, myTransactions, myAssets }}>
          {children}
        </MyAssetsContext.Provider>
      </>
    );
  }
};
