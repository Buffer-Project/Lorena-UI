import { useState } from 'react';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const Comment = ({row}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpand = () => {
        setIsExpanded(!isExpanded);
    }

    const chop = (text,index) => {
        return text.slice(0,index);
    }

    return(
        <>
            <TableRow key={row.name} style={{backgroundColor: '#2C2F33'}}>
                <TableCell component="th" scope="row" style={{width: '18.5%', color: '#ffffff', alignItems: 'center', textAlign: 'center'}}>
                    {row.User}
                </TableCell>
                <TableCell style={{ width: '18.5%', color: '#ffffff', alignItems: 'center', textAlign: 'center' }}>
                    {row.Server}
                </TableCell>
                <TableCell style={{ width: '3%', color: '#ffffff', alignItems: 'center', textAlign: 'center' }}>
                    {row.Comment.length > 70?
                    <Button width="3%" style={{fontSize: '14px', color: '#99AAb5',backgroundColor: '2C2F33'}} onClick={()=>handleExpand()}>
                        {isExpanded?'-':'+'}
                    </Button>
                    :<></>}
                </TableCell>
                <TableCell style={{width: '55%', color: '#ffffff', alignItems: 'center', textAlign: 'center'}} align="right">
                    {row.Comment.length > 70?
                    <div>
                        {isExpanded?row.Comment:`${chop(row.Comment,70)}...`}
                    </div>
                    :row.Comment}
                </TableCell>
            </TableRow>
        </>
    );
}

export default Comment;