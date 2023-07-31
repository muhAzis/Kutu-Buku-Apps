import '../../../styles/StatusBar.css';
import React from 'react';

function StatusBar() {
  return (
    <div className="statusbar-container">
      <div class="storage-capacity">
        <div class="storage-percentage">
          <div class="percentage-container">
            <h1 className="number">100</h1>
            <h5 className="percentage">%</h5>
          </div>
        </div>
        <div class="storage-desc">
          <h1 className="title">Storage Capacity</h1>
          <p className="description">Your current account storage</p>
          <div class="storage-bar">
            <div class="bar"></div>
          </div>
          <p className="size">Size: 7/10 books</p>
        </div>
      </div>
      <div class="readed-books">
        <i className="status-icon uil uil-book-open"></i>
        <div class="storage-percentage">
          <div class="percentage-container">
            <h1 className="number">100</h1>
            <h5 className="percentage">%</h5>
          </div>
          <p className="books-count">
            10 of 10 books<br></br>readed
          </p>
        </div>
      </div>
      <div class="unreaded-books">
        <i className="status-icon uil uil-book"></i>
        <div class="storage-percentage">
          <div class="percentage-container">
            <h1 className="number">100</h1>
            <h5 className="percentage">%</h5>
          </div>
          <p className="books-count">
            10 of 10 books<br></br>unreaded
          </p>
        </div>
      </div>
    </div>
  );
}

export default StatusBar;
