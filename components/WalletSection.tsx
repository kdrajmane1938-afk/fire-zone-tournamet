
import React, { useState } from 'react';
import { User, Transaction } from '../types';
import { MOCK_TRANSACTIONS } from '../constants';

interface WalletSectionProps {
  user: User;
  onDepositRequest: (amount: number, transactionId: string) => void;
}

const WalletSection: React.FC<WalletSectionProps> = ({ user, onDepositRequest }) => {
  const [depositAmount, setDepositAmount] = useState('100');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleOpenPayment = () => {
    if (Number(depositAmount) <= 0) return;
    setShowPaymentModal(true);
  };

  const handleConfirmPayment = () => {
    if (!transactionId.trim()) return;
    
    setIsVerifying(true);
    // Simulate initial submission delay
    setTimeout(() => {
      onDepositRequest(Number(depositAmount), transactionId);
      setIsVerifying(false);
      setShowPaymentModal(false);
      setTransactionId('');
    }, 1500);
  };

  return (
    <div className="p-4 sm:p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-orange-600 to-red-600 p-8 rounded-3xl shadow-xl shadow-orange-900/20 relative overflow-hidden group">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform"></div>
          <div className="relative z-10 space-y-6">
            <div>
              <p className="text-orange-100/80 text-sm font-bold uppercase tracking-widest">Available Balance</p>
              <h3 className="text-5xl font-bold gaming-font mt-2">₹{user.balance.toLocaleString()}</h3>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-black/20 backdrop-blur px-4 py-2 rounded-xl">
                <p className="text-white/60 text-[10px] font-bold uppercase">Total Deposited</p>
                <p className="text-lg font-bold gaming-font">₹1,250</p>
              </div>
              <div className="bg-black/20 backdrop-blur px-4 py-2 rounded-xl">
                <p className="text-white/60 text-[10px] font-bold uppercase">Total Withdrawn</p>
                <p className="text-lg font-bold gaming-font">₹800</p>
              </div>
            </div>
          </div>
        </div>

        {/* Deposit Card */}
        <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 space-y-6">
          <h3 className="text-2xl font-bold gaming-font">QUICK DEPOSIT</h3>
          <div className="grid grid-cols-4 gap-3">
            {['100', '250', '500', '1000'].map(amt => (
              <button 
                key={amt}
                onClick={() => setDepositAmount(amt)}
                className={`py-2 rounded-xl border-2 font-bold transition-all ${
                  depositAmount === amt ? 'border-orange-500 bg-orange-500/10 text-orange-500' : 'border-slate-700 text-slate-400 hover:border-slate-500'
                }`}
              >
                ₹{amt}
              </button>
            ))}
          </div>
          <div className="space-y-4">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
              <input 
                type="number" 
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-4 pl-10 pr-4 focus:outline-none focus:border-orange-500 font-bold text-xl"
              />
            </div>
            <button 
              onClick={handleOpenPayment}
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-600/20 transition-all uppercase tracking-widest"
            >
              Deposit via UPI QR
            </button>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold gaming-font uppercase">Transaction History</h2>
        <div className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-900/50 border-b border-slate-700">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Description</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Type</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {MOCK_TRANSACTIONS.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-200">{tx.description}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                        tx.type === 'DEPOSIT' ? 'bg-green-500/20 text-green-500' :
                        tx.type === 'WINNING' ? 'bg-orange-500/20 text-orange-500' :
                        tx.type === 'ENTRY_FEE' ? 'bg-red-500/20 text-red-500' : 'bg-slate-500/20 text-slate-400'
                      }`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-right font-bold gaming-font ${
                      ['DEPOSIT', 'WINNING'].includes(tx.type) ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {['DEPOSIT', 'WINNING'].includes(tx.type) ? '+' : '-'}₹{tx.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 w-full max-w-md rounded-[2.5rem] border border-slate-700 overflow-hidden shadow-2xl animate-in zoom-in-95">
            <div className="p-6 bg-slate-800 flex justify-between items-center border-b border-slate-700">
               <h3 className="text-xl font-bold gaming-font text-white uppercase tracking-wider">Scan & Pay</h3>
               <button onClick={() => setShowPaymentModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            
            <div className="p-8 text-center space-y-6">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold">A</div>
                <h4 className="text-2xl font-bold text-white">Amrut 3</h4>
              </div>

              <div className="bg-white p-6 rounded-3xl inline-block shadow-lg">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=amrut8301@okhdfcbank&pn=Amrut%203&am=${depositAmount}&cu=INR`} 
                  alt="Bank QR Code"
                  className="w-48 h-48 sm:w-56 sm:h-56"
                />
              </div>

              <div className="space-y-1">
                <p className="text-slate-400 text-sm font-semibold">UPI ID: amrut8301@okhdfcbank</p>
                <p className="text-orange-500 font-bold text-2xl gaming-font mt-2">Amount: ₹{depositAmount}</p>
              </div>

              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 text-left space-y-4">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Step 2: Enter Transaction ID / UTR</label>
                <input 
                  type="text" 
                  placeholder="12 digit Ref Number"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 focus:outline-none focus:border-orange-500 font-bold text-lg text-white"
                />
                <button 
                  onClick={handleConfirmPayment}
                  disabled={!transactionId.trim() || isVerifying}
                  className="w-full py-4 bg-orange-600 rounded-xl font-bold text-white uppercase tracking-widest hover:bg-orange-500 transition-all"
                >
                  {isVerifying ? 'SENDING REQUEST...' : 'Submit to Admin'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletSection;
