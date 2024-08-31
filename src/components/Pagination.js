import React from 'react';
import { getPaginationRange } from '../utils/appUtils';

export const Pagination = ({ totalPages, page, limit, onPageChange }) => {
  return (
    <ul className="pagination pagination-md justify-content-center">
      <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
        <span className="page-link" onClick={() => onPageChange('first')}>
          &laquo;
        </span>
      </li>
      <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
        <span className="page-link" onClick={() => onPageChange('previous')}>
          &lsaquo;
        </span>
      </li>
      {getPaginationRange(totalPages, page, limit).map((item) => (
        <li key={item} className={`page-item ${page === item ? 'active' : ''}`}>
          <span className="page-link" onClick={() => onPageChange(item)}>
            {item}
          </span>
        </li>
      ))}
      <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
        <span className="page-link" onClick={() => onPageChange('next')}>
          &rsaquo;
        </span>
      </li>
      <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
        <span className="page-link" onClick={() => onPageChange('last')}>
          &raquo;
        </span>
      </li>
    </ul>
  );
};
