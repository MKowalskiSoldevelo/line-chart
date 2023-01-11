type LineChartItem = [string, number, number, number, number];
type SelectedCompany = {
  label: string,
  value: string
};
export type CompaniesState = {
  companies: {
    selectedCompany: SelectedCompany
  }
};
export type LineChartProps = {
  dataset: {
    column_names: string[],
    data: LineChartItem[]
  }
};