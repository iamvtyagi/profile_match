import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

type Account = {
  _id: string;
  companyName: string;
  matchScore: number;
  status: 'Target' | 'Not Target';
};

type AccountItemProps = {
  account: Account;
  onStatusChange: (id: string, status: 'Target' | 'Not Target') => void;
};

const AccountItem = ({ account, onStatusChange }: AccountItemProps) => {
  const { _id, companyName, matchScore, status } = account;
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-blue-600 bg-blue-100';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };
  
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{companyName}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getScoreColor(matchScore)}`}>
            {matchScore}%
          </span>
          <div className="ml-3 w-32 bg-gray-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${matchScore >= 80 ? 'bg-green-600' : matchScore >= 60 ? 'bg-blue-600' : matchScore >= 40 ? 'bg-yellow-500' : 'bg-red-600'}`}
              style={{ width: `${matchScore}%` }}
            ></div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          status === 'Target' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {status === 'Target' ? (
            <CheckCircle className="mr-1 h-3 w-3" />
          ) : (
            <XCircle className="mr-1 h-3 w-3" />
          )}
          {status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        {status === 'Target' ? (
          <button
            onClick={() => onStatusChange(_id, 'Not Target')}
            className="text-red-600 hover:text-red-900 transition-colors"
          >
            Remove Target
          </button>
        ) : (
          <button
            onClick={() => onStatusChange(_id, 'Target')}
            className="text-green-600 hover:text-green-900 transition-colors"
          >
            Mark as Target
          </button>
        )}
      </td>
    </tr>
  );
};

export default AccountItem;