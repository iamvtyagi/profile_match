import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import AccountList from './AccountList';
import { Building as Buildings, LogOut, RefreshCw } from 'lucide-react';

type Account = {
  _id: string;
  companyName: string;
  matchScore: number;
  status: 'Target' | 'Not Target';
};

const Dashboard = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const fetchAccounts = async () => {
    setLoading(true);
    setError('');
    
    try {
      const data = await api.getAccounts();
      setAccounts(data);
    } catch (err: any) {
      setError('Failed to load accounts. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleStatusChange = async (id: string, newStatus: 'Target' | 'Not Target') => {
    try {
      await api.updateAccountStatus(id, newStatus);
      
      // Update local state
      setAccounts(accounts.map(account => 
        account._id === id ? { ...account, status: newStatus } : account
      ));
    } catch (err) {
      setError('Failed to update account status. Please try again.');
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Buildings className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Target Account Matching</h1>
            </div>
            <div className="flex items-center">
              <button 
                onClick={fetchAccounts}
                className="mr-4 inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <RefreshCw size={16} className="mr-1" />
                Refresh
              </button>
              <button 
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <LogOut size={16} className="mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Company Accounts</h2>
            <p className="mt-1 text-sm text-gray-600">View and manage target account matches.</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : accounts.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-gray-500">No accounts found. Add some accounts to get started.</p>
            </div>
          ) : (
            <AccountList accounts={accounts} onStatusChange={handleStatusChange} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;