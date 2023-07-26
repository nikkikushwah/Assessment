import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
	const [stockSymbol, setStockSymbol] = useState('');
	const [date, setDate] = useState('');
	const [tradeStats, setTradeStats] = useState(null);

	const handleGetTradeStats = () => {
		axios.post('http://localhost:5000/api/fetchStockData', { stockSymbol, date })
			.then(response => {
				console.log(response.data.stockData);
				setTradeStats(response.data.stockData);
			})
			.catch(error => {
				console.error('Error:', error);
				setTradeStats(null);
			});
	};

	return (
		<>
			<div className="container">
				<h1 className='text-center mt-5'>Stock Trade Statistics Viewer</h1>
				<div className='card App'>
					<div>
						<label htmlFor="stockSymbol"><b>Stock Symbol :</b></label>
						
						<input
							type="text"
							id="stockSymbol"
							value={stockSymbol}
							onChange={(e) => setStockSymbol(e.target.value)}
							placeholder="Enter stock symbol"
							className='form-control'
						/>
						<label className="mt-4" htmlFor="date"><b>Date :</b></label>
						
						<input
							type="date"
							id="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
							className='form-control'
						/>
					</div>
					<div>
						<button class="btn btn-primary mt-4 center" onClick={handleGetTradeStats}>Get Trade Statistics</button>
					</div>

				</div>
				{tradeStats && (
					<div>
						<h2 className='text-center mt-4'>Trade Statistics for <span className='text-danger'> {stockSymbol.toUpperCase()} </span> </h2>
						<table className='align-center'>
							<thead>
								<tr>
									<th>Attribute</th>
									<th>Value</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Open</td>
									<td>{tradeStats.open}</td>
								</tr>
								<tr>
									<td>High</td>
									<td>{tradeStats.high}</td>
								</tr>
								<tr>
									<td>Low</td>
									<td>{tradeStats.low}</td>
								</tr>
								<tr>
									<td>Close</td>
									<td>{tradeStats.close}</td>
								</tr>
								<tr>
									<td>Volume</td>
									<td>{tradeStats.volume}</td>
								</tr>
							</tbody>
						</table>
					</div>
				)}
			</div>
		</>
	);
}

export default App;
