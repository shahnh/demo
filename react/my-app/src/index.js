import React, { useState, useEffect } from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class App extends React.Component {
	

	constructor(props) {
		super(props);
		this.state = {dataFromBack: [], value : ''};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	PostData() {
		var ticket = this.state.value;
		console.log(ticket)
		var jsonData;
			// POST request using fetch inside useEffect React hook
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' }
			};
			fetch('http://localhost:5000/post/' + ticket, requestOptions)
				.then(response => response.json())
				.then(data => this.setState({dataFromBack : data}))
				.then(console.log(this.state.dataFromBack))
				.catch(err => console.log(err));
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
		event.preventDefault();
	}

	handleSubmit(event) {
		event.preventDefault();
		this.PostData();
		// return (
		// 	<>
		// 	<h1>
		// 		Whats up
		// 		</h1>
		// 	</>
		// );
	}

	GetData() {
		var data;
			fetch('http://localhost:5000/', { mode: 'cors' })
				.then(res => res.json())
				.then(data => console.log(data))
				.catch(err => console.log(err));
	}


	render() {
		return (
			<>
				<h1>
					Welcome to Nishil's Webpage!
				</h1>
				<form onSubmit={this.handleSubmit}>
					<label>
						Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
					</label>
					<input type="submit" value="Submit" />
				</form>


				<ul>
		{this.state.dataFromBack.map(ele => {return(
			<>		


			
		<li key={ele.ticker.toString()}>Ticker: {ele.ticker} </li>
		<li key={ele.timestamp.toString()}>Time Stamp: {ele.timestamp} </li>
		<li key={ele.last.toString()}>Last Price: {ele.last} </li>
		<li key={ele.prevClose.toString()}>Previous day price: {ele.prevClose} </li>
		<li key={ele.open.toString()}>Today's open price: {ele.open} </li>
		<li key={ele.volume.toString()}>Volume: {ele.volume} </li>
		<br>
		</br>
		</>)
		;})}
				</ul>
			</>
		);
	}
}

ReactDOM.render(
	<>
		<App />
	</>,
	document.getElementById('root')
);
