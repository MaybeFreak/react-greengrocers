import './styles/filters.css'
import { gsap } from 'gsap'
import { useEffect, useRef, useLayoutEffect } from 'react'

const  Filters = ({showFilters, selectedFilters, setSelectedFilters, setSortType}) => {

    let width = 0
    const tl = useRef()
    const filters = useRef()
    
    useLayoutEffect(() => {
        width = filters.current.offsetWidth * -2
    })

    useEffect(() => {

        tl.current = gsap.timeline({
            paused:true
        })

        tl.current.from('.filters', {
            left: width,
            duration: 0.5,
        })

    },[])

    useEffect(() => {
        showFilters ? tl.current.play() : tl.current.reverse()
    },[showFilters])

    const updateFilters = (filter) => {
        if (selectedFilters.includes(filter)) {
            setSelectedFilters([...selectedFilters.filter((selectedFilter) => selectedFilter !== filter)])
        } else (
            setSelectedFilters([...selectedFilters, filter])
        )
    }

    return (
        <div className="filters" ref={filters} >
            
            <select name="list-style" id="list-style" onChange={(e)=> {setSortType(e.target.value)}}>
                <option value="">Default</option>
                <option value="AtoZ">A to Z</option>
                <option value="ZtoA">Z to A</option>
                <option value="lowToHigh">Price: low to high</option>
                <option value="highToLow">Price: high to low</option>
            </select>

            <form>
                <input type='checkbox' name='fruit' onChange={()=>updateFilters('fruit')}/>
                <label htmlFor='fruit'>Fruit</label>
                <input type='checkbox' name='vegtable' onChange={()=>updateFilters('vegtable')}/>
                <label htmlFor='vegtable'>Vegtable</label>
            </form>

        </div>
    )
}

export default Filters