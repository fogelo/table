import logo from "./logo.svg";
import "./App.css";
import {useCallback, useEffect, useRef, useState} from "react";

const createColumns = (headers) => {
    return headers.map(header => ({
        header: header,
        ref: useRef()
    }))
}

const headers = ["column1", "column2", "column3", "column4", "column5",]
const rows = ["column1", "column2", "column3", "column4", "column5",]

function App() {

    console.log("app")
    const columns = createColumns(headers)


    const tableRef = useRef(null)
    const wrapperRef = useRef(null)
    const [activeIndex, setActiveIndex] = useState(null)

    const onMouseDown = (e, index) => {
        setActiveIndex(index)
    }


    const onMouseMove = (e) => {
        const gridColumns = columns.map((col, i) => {
            if (i === activeIndex) {
                const width = e.clientX + wrapperRef.current.scrollLeft - col.ref.current.offsetLeft + 2
                if (width > 75) return `${width}px`
            }
            return `${col.ref.current.offsetWidth}px`
        })
        tableRef.current.style.gridTemplateColumns = gridColumns.join(" ")

    }


    const onMouseUp = (e) => {
        setActiveIndex(null)
        window.removeEventListener("mousemove", onMouseMove)
        window.removeEventListener("mouseup", onMouseUp)
        tableRef.current.style.cursor = ""
    }

    useEffect(()=>{
        // console.log(wrapperRef.current.style.width)
    },[])


    useEffect(() => {
        window.addEventListener("mousemove", onMouseMove)
        window.addEventListener("mouseup", onMouseUp)

        return () => {
            window.removeEventListener("mousemove", onMouseMove)
            window.removeEventListener("mouseup", onMouseUp)
        }
    }, [activeIndex, onMouseMove, onMouseUp])


    return (
        <div className="App">

            <div className={"sidebar"}/>
            <div className={"wrapper"} ref={wrapperRef}>
                <div className="resizable-table" ref={tableRef}
                     style={{display: "grid", gridTemplateColumns: "minmax(50px, 1fr) minmax(50px, 1fr) minmax(150px, 1fr) minmax(150px, 1fr)minmax(150px, 1fr)"}}>
                    {
                        columns.map((c, i) => <div ref={c.ref} key={c.header}
                                                   className={"resizable-column"}
                        >
                            <div>{c.header}</div>
                            <div className={"resizer"} onMouseDown={(e) => onMouseDown(e, i)}/>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
