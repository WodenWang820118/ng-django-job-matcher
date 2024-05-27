export interface Portfolio {
  id: string;
  name: string;
  description: string;
  resume: string;
  companyData: { [key: string]: string }[];
}
