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
      return this.portfolio.where('id').equals(id).first();
    });
  }

  addPortfolio(list: Portfolio) {
    return from(this.portfolio.add(list));
  }

  clearPortfolio() {
    return from(this.portfolio.clear());
  }

  deletePortfolio(id: string) {
    return from(this.portfolio.delete(id));
  }

  updatePortfolio(id: string, updatedPortfolio: Partial<Portfolio>) {
    const subscription = db.getPortfolio(id).subscribe(async (portfolio) => {
      if (!portfolio) return;
      const finalPortfolio = { ...portfolio, ...updatedPortfolio };
      await this.portfolio.put(finalPortfolio);
      subscription.unsubscribe();
    });
    return subscription;
  }
}

export const db = new AppDB();
