import { Injectable } from '@angular/core';
import { Portfolio } from '../../interfaces/portfolio.interface';
import { v4 as uuidv4 } from 'uuid';

class PortfolioDto implements Portfolio {
  id: string;
  description: string;
  name: string;
  resume: string;
  companyData: { [key: string]: string }[];
  constructor(builder: PortfolioBuilderService) {
    this.id = uuidv4();
    this.name = builder.name;
    this.description = builder.description;
    this.resume = builder.resume;
    this.companyData = builder.companyData;
  }
}

@Injectable({
  providedIn: 'root',
})
export class PortfolioBuilderService {
  name: string = '';
  description: string = '';
  resume: string = '';
  companyData: { [key: string]: string }[] = [];

  withName(name: string) {
    this.name = name;
    return this;
  }

  withDescription(description: string) {
    this.description = description;
    return this;
  }

  withResume(resume: string) {
    this.resume = resume;
    return this;
  }

  withCompanyData(companyData: { [key: string]: string }[]) {
    this.companyData = companyData.map((data) => {
      return { id: uuidv4(), ...data };
    });
    return this;
  }

  build(): PortfolioDto {
    return new PortfolioDto(this);
  }
}
