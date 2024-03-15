import React from 'react';

const ConstantParameters = [
  {
    name: "Camera Resolution ",
    value: '764 x 480 Pixels'
  },
  {
    name: "Frame Rate ",
    value: '32 Hz'
  },
  {
    name: "Target Distance",
    value: '1.5 m'
  },
  {
    name: "Wire Feed Rate",
    value: '5.4 m/min'
  },
  {
    name: "Welding Speed ",
    value: '25 cm/min'
  },
  {
    name: "Shieldng Gas Flow Rate ",
    value: '15 lpm'
  },
];

const ConstantData = () => {
  return (
    <div className='table defects'>
      <table className='table-auto border rounded'>
        <thead>
          <tr className="bg-blue-200">
            <th className="px-5 py-2 text-center border">Parameters</th>
            <th className="px-2 py-2 text-center border">Values</th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-x divide-gray-200'>
          {ConstantParameters.map(x => (
            <tr key={x.name}>
              <td className="px-5 py-2 whitespace-nowrap border">
                <div className="flex items-center justify-between">
                  <span>{x.name}</span>
                </div>
              </td>
              <td className="px-5 py-2 whitespace-nowrap border">
                <div className="flex items-center justify-between">
                  <span>{x.value}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConstantData;
