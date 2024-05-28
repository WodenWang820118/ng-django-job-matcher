import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface CosineSimilarityResponse {
  resume: string;
  results: { id: string; score: number }[];
}

@Injectable({
  providedIn: 'root',
})
export class CosineSimilarityService {
  url = 'http://localhost:8000/api/cosinesimilarity/';
  constructor(private http: HttpClient) {}

  calculateCosineSimilarity(
    resume: string,
    companyData: {
      [key: string]: string | { text: string; hyperlink: string };
    }[]
  ) {
    const companyText = this.transformCompanyData(companyData);
    return this.http.post<CosineSimilarityResponse>(this.url, {
      resume: resume,
      company_texts: companyText,
    });
  }

  transformCompanyData(
    companyData: {
      [key: string]: string | { text: string; hyperlink: string };
    }[]
  ): { id: string; text: string }[] {
    return companyData.map((company) => {
      let text = '';
      for (const key in company) {
        if (typeof company[key] === 'object') {
          text += (company[key] as { text: string; hyperlink: string }).text;
        } else {
          text += company[key] as string;
        }
      }

      return {
        id: company['id'] as string,
        text: text.trim(),
      };
    });
  }
}
