import { ReactComponent as NoDefect } from '../assets/icons/None.svg';
import { ReactComponent as Error } from '../assets/icons/Error.svg';

const defectType = [
    {
        name: "Burn Through",
        image: <NoDefect />
    },
    {
        name: "Porosity",
        image: <Error />
    },
    {
        name: "Spatter",
        image: <NoDefect />
    },
    {
        name: "Lack of Fusion",
        image: <NoDefect />
    },
    {
        name: "Contamination",
        image: <NoDefect />
    },
    {
        name: "Cracks and Craters",
        image: <NoDefect />
    },
];

const Defects = () => {
    return (
        <div className='table defects'>
            <table className='table-auto border rounded'>
                <thead>
                    <tr className="bg-blue-200">
                        <th className="px-1 py-2 text-centre">DEFECTS</th>
                    </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                    {defectType.map(x => (
                        <tr key={x.name}>
                            <td className="px-1 py-2 whitespace-nowrap">
                                <div className="flex items-center justify-between">
                                    <span className="ml-4">{x.name}</span>
                                    <span className="ml-4">{x.image}</span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Defects;
