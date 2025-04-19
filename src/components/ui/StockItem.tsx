import { IStockItem } from "../../interfaces"

interface StockProps {
  stock: IStockItem
}

const StockItem: React.FC<StockProps> = ({ stock }) => {
  return (
    <div className='bg-white shadow-sm w-52 p-3 pb-4 rounded-md ' >

      <img className="w-full rounded-md bg-slate-100 p-2" src="/src/assets/images/Nasdaq-Logo.png" alt="stock" />

      <div className="mt-3 relative">
        <h2 className="text-md">{stock.ticker}</h2>
        <h4 className="text-xs font-extralight text-gray-400">{stock.name}</h4>
      </div>
    </div>
  )
}

export default StockItem