import { useState } from 'react'
import './App.css'
import InputBox from './components/Inputbox'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {

  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState('usd')
  const [to, setTo] = useState('inr')

  const rates = useCurrencyInfo(from)
  const [convertedAmount, setConvertedAmount] = useState(0)

  const convert = () => {
    if (!rates) return
    setConvertedAmount(amount * rates[to])
  }

  const swap = () => {
    setFrom(to)
    setTo(from)
  }

  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/3394939/pexels-photo-3394939.jpeg')`,
      }}
    >

      <div className="w-full max-w-md mx-auto border border-gray-600 rounded-lg p-5 backdrop-blur-sm bg-white/30">

        <form>

          {/* FROM */}
          <InputBox
            label="From"
            amount={amount}
            onAmountChange={setAmount}
            currencyOptions={Object.keys(rates || {})}
            selectedCurrency={from}
            onCurrencyChange={setFrom}
          />

          {/* SWAP BUTTON */}
          <div className="text-center my-2">
            <button
              type="button"
              onClick={swap}
              className="bg-blue-500 text-white px-3 py-1 rounded-lg"
            >
              Swap
            </button>
          </div>

          {/* TO */}
          <InputBox
            label="To"
            amount={convertedAmount}
            currencyOptions={Object.keys(rates || {})}
            selectedCurrency={to}
            onCurrencyChange={setTo}
          />

          {/* CONVERT BUTTON */}
          <div className="text-center mt-3">
            <button
              type="button"
              onClick={convert}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Convert
            </button>
          </div>

        </form>

      </div>
    </div>
  )
}

export default App