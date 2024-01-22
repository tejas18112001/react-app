
import './Header.css';
import Login from './Login'
import { Link, useNavigate } from 'react-router-dom'
import cat from './categoriesType';
import Home from './Home'
function Categories(props) {
    const it = "All Categories" ;
    return (
  
  <div className='cat-container'>
            <div className='all-categories  category' 
                 onClick={()=>{
                    props.handleCategory && props.handleCategory(it)
                }
              }
            >
                All Categories
            </div>

            <div className='catmenu'>
                {cat && cat.length > 0 &&
                    cat.map((item, index) => (
                        <span 
                            key={index} 
                            className='category' 
                            onClick={()=>{props.handleCategory && props.handleCategory(item)}}
                        >
                            
                            {item}
                        </span>
                    ))}
            </div>
        </div>
    )
}

export default Categories;