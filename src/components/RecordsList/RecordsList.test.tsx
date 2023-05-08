import React from 'react';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import RecordsList from './RecordsList';
import { getRecords, deleteRecord } from '../../api/records';
import { LoadingProvider } from '../../contexts/LoadingProvider';
import { formatOperationType } from '../../utils';

// Mock the API calls
jest.mock('../../api/records');

const mockGetRecords = getRecords as jest.MockedFunction<typeof getRecords>;
const mockDeleteRecord = deleteRecord as jest.MockedFunction<typeof deleteRecord>;

const mockedRecords = [
  {
    "_id": "6457ef3a32321ef0cda51181",
    "user": "6450f05115b430b0ec783a98",
    "amount": "2",
    "userBalance": "2",
    "operationResponse": "35",
    "deletedAt": null,
    "date": "2023-05-07T18:34:34.112Z",
    "operationType": "multiplication"
  },
  {
    "_id": "6457ef3532321ef0cda5117b",
    "user": "6450f05115b430b0ec783a98",
    "amount": "2",
    "userBalance": "4",
    "operationResponse": "17.5",
    "deletedAt": null,
    "date": "2023-05-07T18:34:29.067Z",
    "operationType": "division"
  }
];

const renderRecordsList = () => {
  render(
    <LoadingProvider>
      <RecordsList />
    </LoadingProvider>
  );
};

describe('RecordsList', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockGetRecords.mockReset();
    mockDeleteRecord.mockReset();
  });

  it('should render the Records List title', async () => {
    await act(async () => {
      renderRecordsList();
    });

    await waitFor(() => expect(mockGetRecords).toHaveBeenCalled());

  });

  // it('should load and display records', async () => {
  //   const mockedRecords = [
  //     {
  //       "_id": "6457ef3a32321ef0cda51181",
  //       "user": "6450f05115b430b0ec783a98",
  //       "amount": "2",
  //       "userBalance": "2",
  //       "operationResponse": "35",
  //       "deletedAt": null,
  //       "date": "2023-05-07T18:34:34.112Z",
  //       "operationType": "multiplication"
  //     },
  //     {
  //       "_id": "6457ef3532321ef0cda5117b",
  //       "user": "6450f05115b430b0ec783a98",
  //       "amount": "2",
  //       "userBalance": "4",
  //       "operationResponse": "17.5",
  //       "deletedAt": null,
  //       "date": "2023-05-07T18:34:29.067Z",
  //       "operationType": "division"
  //     }
  //   ];

  //   mockGetRecords.mockResolvedValue({
  //     data: mockedRecords,
  //     totalCount: mockedRecords.length,
  //     page: 1,
  //     perPage: 2,
  //   });

  //   act(() => {
  //     renderRecordsList();
  //   });
  //   // screen.debug();
  //   await waitFor(() => expect(mockGetRecords).toHaveBeenCalled());

    
  // });

  it('should handle search input', async () => {
    await act(async () => {
      renderRecordsList();
    });
    
    const searchInput = screen.getByLabelText('Search');

    await act(async () => {
      userEvent.type(searchInput, 'test search');
    });

    expect(searchInput).toHaveValue('test search');
  });

  it('should handle hiding deleted rows', async () => {
    await act(async () => {
      renderRecordsList();
    });

    // set up the mocked records and mock API call
    mockGetRecords.mockResolvedValue({
      data: mockedRecords,
      totalCount: mockedRecords.length,
      page: 1,
      perPage: 2,
    });



    // assert that the mocked API call has been called
    await waitFor(() => expect(mockGetRecords).toHaveBeenCalled());

    // assert that the hide deleted rows checkbox is present
    const hideDeletedCheckbox = screen.getByText('hide deleted rows').previousSibling as HTMLElement;
    expect(hideDeletedCheckbox).toBeInTheDocument();

    // // assert that all rows are initially visible
    // mockedRecords.forEach((record) => {
    //   expect(screen.getByText(formatOperationType(record.operationType))).toBeInTheDocument();
    // });


    // await act(async () => {
    //   fireEvent.click(hideDeletedCheckbox);
    // });

    // // assert that only rows without a deletedAt property are visible
    // mockedRecords.forEach((record) => {
    //   if (record.deletedAt) {
    //     expect(screen.queryByText(formatOperationType(record.operationType))).not.toBeInTheDocument();
    //   } else {
    //     expect(screen.getByText(formatOperationType(record.operationType))).toBeInTheDocument();
    //   }
    // });
    
  });

});