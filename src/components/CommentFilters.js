import {useState, useEffect} from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const CommentFilters = ({filterTypes,setFilterTypes,filterValue,setFilterValue,jsonData}) => {
    const [filterValueOptions, setFilterValueOptions] = useState([]);
    // filterTypes: valor por el que filtro: User o Server (None: sin filtros) 
    // filterValue: valor del User o Server por el que quiero filtrar

    function containsElement(array,value){
        let bool = false;
        for(let i=0;i<array.length;i++){
          if (array[i] === value){
            bool = true;
          }
        }
        return bool;
    }
  
    useEffect(()=>{
      const getFilterValueOptions = () => { //obtengo todos los valores del tipo de filtro actual (Los Users o Servers) por los que puedo filtrar los comentarios
        let FilterValuesToAdd = [];
        for(let i=0;i<jsonData.length;i++){
            if(filterTypes === 'User' && !containsElement(FilterValuesToAdd,jsonData[i].User)){ 
            FilterValuesToAdd.push(jsonData[i].User);
            }
            else if(filterTypes==='Server' && !containsElement(FilterValuesToAdd,jsonData[i].Server)){
                FilterValuesToAdd.push(jsonData[i].Server);
            }
        }
        setFilterValueOptions(FilterValuesToAdd);
        }
        getFilterValueOptions();
    },[filterTypes,jsonData])
  
  
  
    const handleChange = (event) => {
      event.preventDefault();
      setFilterTypes(event.target.value);
      setFilterValue('');
    }
  
    const handleValueChange = (event) => {
      event.preventDefault();
      setFilterValue(event.target.value);
    }
  
    return (
      <div>
        <div style={{margin: 'auto', minHeigth:'20%', maxWidth: '25%',backgroundColor: '#4e5d94', borderRadius: '4px', marginTop: '2%'}}>
          <span style={{color: '#ffffff', minWidth: '50%', padding:'3%'}}>Filter by: </span>
          <Select
            labelId="filter-select-label"
            id="filter-select"
            value={filterTypes}
            onChange={handleChange}
            style={{color: '#ffffff',backgroundColor: '#7289da', width:'50%', maxHeigh: '90%',}}
          >
            <MenuItem value={'None'}>None</MenuItem>
            <MenuItem value={'User'}>User</MenuItem>
            <MenuItem value={'Server'}>Server</MenuItem>
          </Select>
        </div>
        <div style={{margin: 'auto', minHeigth:'20%', maxWidth: '25%',backgroundColor: '#4e5d94', borderRadius: '4px', marginTop: '1%'}}>
          
          {filterTypes!=='None'?
            <div>
              <span style={{color: '#ffffff', minWidth: '50%', padding:'3%'}}>Select {filterTypes}</span>
              <Select
                labelId="filter-select-label"
                id="filter-select"
                value={filterValue}
                onChange={handleValueChange}
                style={{color: '#ffffff',backgroundColor: '#7289da', width: '50%', maxHeigh: '90%'}}
              >
                {!!filterValueOptions && (filterValueOptions.map((row)=>
                  <MenuItem key={`id${row}`} value={row}>{row}</MenuItem>
                ))
                }
              </Select>
            </div>
          :<></>
          }
        </div>
      </div>
    );
  }

export default CommentFilters;