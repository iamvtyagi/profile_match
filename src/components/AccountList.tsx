import React from 'react';
import AccountItem from './AccountItem';

type Account = {
  _id: string;
  companyName: string;
  matchScore: number;
  status: 'Target' | 'Not Target';
};

type AccountListProps = {
  accounts: Account[];
  onStatusChange: (id: string, status: 'Target' | 'Not Target') => void;
};

const AccountList = ({ accounts, onStatusChange }: AccountListProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Company
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Match Score
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {accounts.map((account) => (
            <AccountItem 
              key={account._id} 
              account={account} 
              onStatusChange={onStatusChange} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountList;