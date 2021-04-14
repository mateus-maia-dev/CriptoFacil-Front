import * as S from "../style";

const TableAccounting = () => {
  return (
    <S.Tables>
      <S.Table>
        <thead>
          <tr>
            <th>Mês</th>
            <th>Movimentação no exterior</th>
            <th>Total de vendas</th>
            <th>Lucro/Prejuízo</th>
            <th>Imposto devido</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Janeiro</td>
            <td>R$20.000</td>
            <td>R$20.000</td>
            <td>+R$2.000</td>
            <td>R$300</td>
          </tr>

          <tr>
            <td>Fevereiro</td>
            <td>R$20.000</td>
            <td>R$20.000</td>
            <td>+R$2.000</td>
            <td>R$300</td>
          </tr>

          <tr>
            <td>Março</td>
            <td>R$20.000</td>
            <td>R$20.000</td>
            <td>+R$2.000</td>
            <td>R$300</td>
          </tr>
        </tbody>
      </S.Table>
    </S.Tables>
  );
};

export default TableAccounting;