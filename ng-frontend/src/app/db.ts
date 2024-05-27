import Dexie, { Table, liveQuery } from 'dexie';
import { from } from 'rxjs';
import { Portfolio } from './shared/interfaces/portfolio.interface';

export class AppDB extends Dexie {
  portfolio!: Table<Portfolio, string>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(3).stores({
      portfolio: '++id',
    });
  }

  getPortfolios() {
    return liveQuery(() => {
      return this.portfolio.toArray();
    });
  }

  getPortfolio(id: string) {
    return liveQuery(() => {
      return this.portfolio.where('id').equals(id).toArray();
    });
  }

  addPortfolio(list: Portfolio) {
    return from(this.portfolio.add(list));
  }

  clearPortfolito() {
    return from(this.portfolio.clear());
  }

  deleteList(id: string) {
    return from(this.portfolio.delete(id));
  }

  updatePortfolio(id: string, updatedPortfolio: Portfolio) {
    return db.getPortfolios().subscribe((portfolios) => {
      console.log(portfolios);
      const portfolio = portfolios.find((portfolio) => portfolio.id === id);
      if (!portfolio) return;
      this.portfolio.put(updatedPortfolio);
    });
  }
}

export const db = new AppDB();
