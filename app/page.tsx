"use client";
import { useState } from "react";

export default function MKBet() {
  const [balance, setBalance] = useState(5000);
  const [betslip, setBetslip] = useState<any[]>([]);
  const [stake, setStake] = useState(1000);

  const matches = [
    { id: 1, teams: "Man City vs Arsenal", odds: { home: 2.1, draw: 3.2, away: 3.5 }, time: "19:45" },
    { id: 2, teams: "Barcelona vs Real Madrid", odds: { home: 2.5, draw: 3.0, away: 2.8 }, time: "21:00" },
    { id: 3, teams: "Liverpool vs Chelsea", odds: { home: 1.9, draw: 3.4, away: 4.0 }, time: "18:30" },
    { id: 4, teams: "Uganda vs Kenya", odds: { home: 1.8, draw: 3.1, away: 4.5 }, time: "16:00" },
  ];

  const addBet = (match: any, type: string, odd: number) => {
    const bet = { match: match.teams, type, odd, id: Date.now() };
    setBetslip([bet]);
  };

  const totalOdd = betslip.reduce((acc, b) => acc * b.odd, 1) || 0;
  const win = totalOdd * stake;

  const placeBet = () => {
    if (stake > balance) return alert("Balance ntono! Deposit.");
    if (betslip.length === 0) return alert("Londa odd!");
    setBalance(balance - stake);
    alert(`Bet placed! Oyinza okuwangula UGX ${win.toLocaleString()}`);
    setBetslip([]);
  };

  return (
    <div style={{ background: "#0a0a0a", color: "white", minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* Header - MKBet style */}
      <div style={{ background: "#ffcc00", color: "black", padding: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontWeight: "900", margin: 0 }}>MK BET</h1>
        <div style={{ background: "black", color: "#ffcc00", padding: "6px 12px", borderRadius: "20px", fontWeight: "bold" }}>
          UGX {balance.toLocaleString()}
        </div>
      </div>

      <div style={{ padding: "10px", display: "flex", gap: "8px" }}>
        <button style={{ flex: 1, background: "#00c853", border: 0, padding: "10px", borderRadius: "6px", fontWeight: "bold" }} onClick={()=>{ const amt=prompt("Deposit amount (UGX):"); if(amt) setBalance(balance+parseInt(amt))}}>DEPOSIT</button>
        <button style={{ flex: 1, background: "#333", color: "white", border: 0, padding: "10px", borderRadius: "6px", fontWeight: "bold" }} onClick={()=>{ const amt=prompt("Withdraw amount:"); if(amt) setBalance(balance-parseInt(amt))}}>WITHDRAW</button>
      </div>

      <div style={{ padding: "10px" }}>
        <h3 style={{ color: "#ffcc00" }}>Today's Matches - LIVE ODDS</h3>
        {matches.map(m => (
          <div key={m.id} style={{ background: "#1a1a1a", marginBottom: "10px", borderRadius: "8px", padding: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#aaa" }}>
              <span>{m.time}</span><span>UG Premier</span>
            </div>
            <div style={{ fontWeight: "bold", margin: "6px 0" }}>{m.teams}</div>
            <div style={{ display: "flex", gap: "6px" }}>
              <button onClick={()=>addBet(m, "1 - Home", m.odds.home)} style={{ flex: 1, background: "#2a2a2a", color: "white", border: "1px solid #444", padding: "8px", borderRadius: "4px" }}>1 - {m.odds.home}</button>
              <button onClick={()=>addBet(m, "X - Draw", m.odds.draw)} style={{ flex: 1, background: "#2a2a2a", color: "white", border: "1px solid #444", padding: "8px", borderRadius: "4px" }}>X - {m.odds.draw}</button>
              <button onClick={()=>addBet(m, "2 - Away", m.odds.away)} style={{ flex: 1, background: "#2a2a2a", color: "white", border: "1px solid #444", padding: "8px", borderRadius: "4px" }}>2 - {m.odds.away}</button>
            </div>
          </div>
        ))}
      </div>

      {/* Bet Slip */}
      {betslip.length > 0 && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#1e1e1e", borderTop: "2px solid #ffcc00", padding: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}><span>Bets: {betslip.length}</span><span onClick={()=>setBetslip([])} style={{ color: "red" }}>Clear</span></div>
          {betslip.map(b => <div key={b.id} style={{ fontSize: "13px", margin: "4px 0" }}>{b.match} - {b.type} @ {b.odd}</div>)}
          <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
            <input type="number" value={stake} onChange={e=>setStake(parseInt(e.target.value)||0)} style={{ flex: 1, padding: "10px", borderRadius: "4px", border: 0 }} placeholder="Stake" />
            <div style={{ flex: 1, textAlign: "right" }}><div style={{ fontSize: "12px", color: "#aaa" }}>Odd: {totalOdd.toFixed(2)}</div><div style={{ fontWeight: "bold", color: "#ffcc00" }}>Win: {win.toLocaleString()}</div></div>
          </div>
          <button onClick={placeBet} style={{ width: "100%", background: "#ffcc00", color: "black", border: 0, padding: "12px", borderRadius: "6px", fontWeight: "900", marginTop: "8px", fontSize: "16px" }}>PLACE BET</button>
        </div>
      )}
      <div style={{ height: "180px" }}></div>
    </div>
  );
}
