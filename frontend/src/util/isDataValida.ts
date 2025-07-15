import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

// É preciso utilizar o plugin customParseFormat de dayjs.
dayjs.extend(customParseFormat);

const isDataValida = (umaData: string) => {
  let dateArray = umaData.split("/");
  let novaData: string = dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];
  // string template ou template literal em inglês: delimitado por crazes ou backticks
  // let novaData: string = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
  // O true ativa validação estrita. Por exemplo, não irá aceitar 2025/06/12.
  // Para validar datas com formatos personalizados como YYYY-MM-DD, é preciso importar
  // e estender customParseFormat.
  return dayjs(novaData, "YYYY-MM-DD", true).isValid();
};
export default isDataValida;
