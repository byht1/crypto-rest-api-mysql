export interface ICoinbase {
  data: Data;
}

interface Data {
  currency: string;
  rates: { [key: string]: string };
}
