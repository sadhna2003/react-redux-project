import { useDispatch, useSelector } from "react-redux";
import { increment,decrement, incrementByAmount } from "./counterSlice";
import { useState } from "react";
const Counter = () => {
    const count = useSelector((state: any) => state.counter.value);
    const dispatch = useDispatch();
    const [incrementByAmountValue, setIncrementByAmountValue] = useState('0');
    const addValue = Number(incrementByAmountValue) || 0;
    return (
      <section className="flex flex-col w-full justify-center items-center py-3 gap-3">
        <p className="text-8xl font-bold">{count}</p>
        <div className="flex flex-row justify-center gap-1">
            <button onClick={() => dispatch(increment())} className="p-4 border border-black">
             +
            </button>
            <button onClick={() => dispatch(decrement())} className="p-4 border border-black">
             -
            </button>
            <button onClick={() => dispatch(incrementByAmount(5))} className="p-4 border border-black">
             +5
            </button>
        </div>
        <input
         type="text"
         value={incrementByAmountValue}
         onChange={(e) => setIncrementByAmountValue(e.target.value)}
         className="p-4 border border-black w-20 text-center"
        />
         <button onClick={() => dispatch(incrementByAmount(addValue))} className="p-4 border border-black">
             AddByAmount
            </button>
      </section>
    )
}
export default Counter;