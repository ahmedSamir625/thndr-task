import { useSelector } from "react-redux";
import { IStockItem } from "../../interfaces";
import EmptyState from "./EmptyState";
import StockItem from "./StockItem";
import { useEffect, useState } from "react";

const StocksList = () => {
  const keyword = useSelector((state: { filter: string }) => state.filter);

  const stocks = useSelector(
    (state: {
      stocks: { stocks: IStockItem[]; filteredStocks: IStockItem[] };
    }) => state.stocks
  );

  const [previewdStock, setPreviewdStock] = useState<IStockItem[]>([]);
  useEffect(() => {
    if (stocks.filteredStocks.length || (!stocks.filteredStocks.length && keyword)) {
      setPreviewdStock(stocks.filteredStocks);
    } else {
      if (stocks.stocks.length) {
        setPreviewdStock(stocks.stocks);
      }
    }
  }, [stocks]);

  return (
    <>
      {previewdStock.length ? (
        <div className="py-4 grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {previewdStock?.map((stock: IStockItem, index: number) => (
            <StockItem key={`${stock.cik}-${index}`} stock={stock} />
          ))}
        </div>
      ) : (
        <EmptyState message="No stocks found" />
      )}
    </>
  );
};

export default StocksList;
