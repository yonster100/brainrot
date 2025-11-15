import {useState, useRef, useTransition} from "react"



function TabButton({active, label}) {

    

   

    const tabStyle = (active) => ({

        display: "inline-block",

        padding: "8px 16px 8px 16px",

        cursor: "pointer",

        backgroundColor: active ? "#444" : "#222",

        borderBottom: active ? "2px solid blue" : "none",

        width: "200px",

        

    });

    return (

        <span style={tabStyle(active)}>

        {label}

        </span>

    );

}

function SwitchBoard({tabs, activeTab, setActiveTab}) {

    const myStyle = {

        backgroundColor: "black",

        color: "white",

        padding: "0px",

        borderRadius: "0px 0px 6px 0px",

        textAlign: "left",

    };

    

    return (

        <div style={myStyle}>

        <h1>Brain</h1>

        <SearchBar/>

        {tabs.map((x, i) => 

            (

                <div key={i} onClick={() => setActiveTab(i)}>

                    <TabButton active={i === activeTab} label={x.label}/>

                </div>

            )

        )}

        </div>

    );

}

function ActiveContent({content}) {

    const myStyle = {

        color: "black",

        marginTop: "0px",

        padding: "0px",

        backgroundColor: "white",

        height: "100vh",

        width: "100vw",

    }

    return (

        <div style={myStyle}>

            {content}

        </div>

    );

}

function ToggleSwitch2({id, update}) {

    const [active, setActive] = useState(false);

    const toggle = () => {

        update?.(active ? "OFF" : "ON");

        setActive(!active);

    };

    const animationStyle = {

        backgroundColor: active ? "#88f" : "#222",

        transition: "background-color 0.3s, transform 0.3s",

        transform: active ? "translateX(36px)" : "translateX(0px)",

        color: "white",

        borderRadius: "36px",

        border: "3px solid green",

        cursor: "pointer",

        outline: "None",

        padding: "5px",

        width: "6px",

        height: "6px",

    };

    const hiddenCheckbox = {

        display: "none",

        width: "0",

        height: "0",

    }

    return (

        <div

            onClick={toggle}

            style={{

                backgroundColor: active ? "#8f8" : "#222",

                color: "white",

                borderRadius: "36px",

                border: "3px solid green",

                cursor: "pointer",

                transition: "background-color 0.3s",

                outline: "None",

                padding: "5px",

                width: "56px",

            }}

        >

            <input id={id} style={hiddenCheckbox} type={"checkbox"} checked={active}/>

            <div style={animationStyle}>

            </div>

        </div>

    );

}

function ProgressBar({value}) {

    const outerBarStyle = {

        border: "3px solid #474",

        borderRadius: "6px",

        backgroundColor: "#abf",

        height: "10px",

        width: "100px",

    }

    const innerBarStyle = {

        borderRadius: "6px",

        backgroundColor: "#474",

        height: "10px",

        width: `calc(${value}px + 4px)`,

        transform: "translateX(-2px)" // cuz for some reason, it lacks 1px

    }

    return (

        <div style={outerBarStyle} value={value}>

            <div style={innerBarStyle} value={value}>

            </div>

        </div>

    );

}

function CardWrapper({children}) {

    const cardStyle = {

        margin: "15px",

        borderRadius: "6px",

        width: "300px",

        backgroundColor: "#666",

        display: "flex",

        flexDirection: "row",

        alignItems: "stretch",

        justifyContent: "center",

        flexWrap: "wrap",

        border: "3px solid #333",

        maxHeight: "300px",

        overflowY: "auto",

        scrollbarGutter: "stable",

        // overflowClipMargin: "0px",

    };

    return (

        <div style={cardStyle}>

            {children}

        </div>

    );

}

function Card({children}) {

    const cardStyle = {

        margin: "15px",

        borderRadius: "6px",

        width: "100px",

        backgroundColor: "#6a6",

        display: "flex",

        textAlign: "center",

        alignItems: "center",

        justifyContent: "center",

        minHeight: "50px",

    };

    return (

        <div style={cardStyle}>

            {children}

        </div>

    );

}

function ToggleSwitch({id}) {

    const [active, setActive] = useState(false);

    const toggle = () => {setActive(!active)};

    return (

        <button

            onClick={toggle}

            style={{

                backgroundColor: active ? "#889" : "#222",

                color: "white",

                borderRadius: "6px",

                border: "3px solid green",

                cursor: "pointer",

                transition: "background-color 0.3s",

                outline: "None",

                padding: "5px",

                width: "56px",

            }}>

            {active ? "ON" : "OFF"}

        </button>

    );

}

function DropDown({myList, children, selectedOption, refocus = () => {}}) {

    const [select, setSelect] = useState(myList && myList[0]);

    const [openDropDown, setOpenDropDown] = useState(false);

    const wrapperStyle = {

        position: "relative",

        display: "inline-block",

        userSelect: "none",

    }

    const dropDownStyle = {

        backgroundColor: "#555",

        position: "absolute",

        top: "100%",

        left: 0,

        right: 0,

        overflow: "hidden",

        zIndex: 10,

    };

    const [hover, setHover] = useState(null);

    const optionStyle = (isHovered) => {return {

        padding: "6px",

        backgroundColor: isHovered ? "#333" : "#666",

        color: "white",

        cursor: "pointer",

    }};

    

    const [lateTrigger, setLateTrigger] = useState(false);

    return (  

        <div style={wrapperStyle}>

            {/* Options */}

            {openDropDown && (<div style={dropDownStyle} onClick={refocus}>

                {myList.map(x => 

                    <div key={x}

                        onClick={() => {

                            setSelect(x);

                            setOpenDropDown(false);

                            selectedOption?.(x);

                        }}

                        style={optionStyle(hover === x)}

                        onMouseEnter={() => setHover(x)}

                        onMouseLeave={() => setHover(null)}

                    >

                        {x}

                    </div>

                )}

                </div>

            )}

            

            <div onClick={() => setOpenDropDown(!openDropDown)}>

                {children}

            </div>

        </div>

    );

}

function SelectInput({id, myList}) {

    const myStyle = {

        border: "3px solid green",

        backgroundColor: "#999",

        outline: "None",

        width: "100px",

        height: "30px",

    };

    

    const [inputValue, setInputValue] = useState(myList && myList[0]);

    return (

        <DropDown id={id} style={myStyle} myList={myList} 

            selectedOption={(x) => {

                console.log(`You selected ${x}`);

                setInputValue(x)

            }}

        >

                

            <div style={myStyle}

                type="text"

                placeHolder={"random"}

            >

                <span style={{paddingLeft: "10px"}}>{inputValue}</span>

            </div>

        </DropDown>

    );

}

function SearchBar({id, placeHolder = "US", data = ["The Goonies", "Dr Panda", "Peppa Pig", "Miss R"]}) {

    const [currentList, setCurrentList] = useState(data);

    const [inputValue, setInputValue] = useState("");

    {/* Design of the text area*/}

    

    const myStyle = {

        border: "0px",

        backgroundColor: "#999",

        color: "white",

        outline: "None",

        height: "30px",

        width: "198px",

    };

    const submitButtonStyle = {

        position: "absolute",

        border: "0px",

        backgroundColor: "#373",

        color: "#484",

        outline: "None",

        height: "32px",

        width: "30px",

    };

    function makeChange(e) {

        setInputValue(e.target.value);

        setCurrentList(data.filter(x => x.toLowerCase().includes(e.target.value.toLowerCase())));

    }

    const inputFocus = useRef();

    const inputRefocus = () => {inputFocus.current.focus();};

    return (

        <form>

            <DropDown myList={currentList}

                selectedOption={(x) => {

                    console.log(`You selected ${x}`);

                    setInputValue(x)

                }}

                refocus={inputRefocus}

            >

                <input style={myStyle}

                    type="text"

                    placeHolder={placeHolder}

                    value={inputValue}

                    onChange={makeChange}

                    ref={inputFocus}

                />

                <input style={submitButtonStyle} type="submit" value="@"/>

            </DropDown>

        </form>

    )

}

function HelpContent() {

    return (

        <>

            <CardWrapper>

                <Card>

                    How odd...

                </Card>

                <Card>

                    How odd...huh....

                </Card>

                <Card>

                    How odd... what chu mean how odd

                </Card>

                <Card>

                    How odd...

                </Card>

                <Card>

                    How odd...huh....

                </Card>

                <Card>

                    How odd... what chu mean how odd

                </Card>

            </CardWrapper>

        </>

    );

}

function PieChart() {

    const pieStyle = {

      width: "400px",

      height: "400px",

      backgroundImage: "conic-gradient(#456 64%, #99f 64%, #99f 81%, black 81%, black 91%, #faf 91%)",

      borderRadius: "50%",

    };

    return (

      <div style={pieStyle}/>  

    );

}

function SettingsContent() {

    const [wrapperWidth, setWrapperWidth] = useState(200);

    const wrapperStyle = {

        backgroundColor: "#ccf",

        width: wrapperWidth + "px",

        height: "100px",

        position: "absolute",

        top: "50vh",

        left: `calc(50vw + 116px)`,

        borderRadius: "16px",

        boxShadow: "0px 0px 2px 1px rgba(40, 40, 0, 0.3)",

        transform: "translateY(-50%) translateX(-50%)",

        alignItems: "center",

        justifyContent: "center",

        display: "flex",

        flexDirection: "column",

    }

    const myHeader = {

        padding: "0px",

        margin: "0px",

        display: "flex",

        fontSize: "15px",

    }

    const inputStyle = {

        width: "125px",

        alignItems: "center",

        justifyContent: "center",

        borderRadius: "6px",

        border: "3px solid gray",

        outline: "none",

    }

    const submitButton = {

        width: "60px",

        outline: "none",

        border: "3px solid #999",

        backgroundColor: "#ccc",

    }

    return (

        <>

            <form>

            <div style={wrapperStyle}>

                <h1 style={myHeader}>Log</h1>

                <DialogBox textDialog="username">

                    <input type="text" style={inputStyle}/>

                </DialogBox>

                <DialogBox textDialog="password">

                    <input type="password" style={inputStyle}/>

                </DialogBox>

                <input type="submit" style={submitButton}/>

            </div>

            </form>

        </>

    );

}

function MenuContent() {

    const [dialogText, setDialogText] = useState("OFF");

    return (

        <>

            <span>This is menu content</span>

            <SelectInput id="random" myList={["huh", "123", "ohh"]}/>

            <p></p>

            <DialogBox textDialog={dialogText}>

                <ToggleSwitch2 update={(content) => {setDialogText(content)}}/>

            </DialogBox>

            <PieChart/>

            <ProgressBar value={0}/>

        </>

    );

}

function DialogBox({id, children, textDialog}) {

    const [isHovered, setIsHovered] = useState(false);

    const dialogTimer = useRef(null);

    const dialogAppearTimeout = 500;

    const dialogBoxStyle = {

        position: "absolute",

        backgroundColor: "#999",

        padding: "10px",

        color: "white",

        borderRadius: "6px",

        boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)',

        zIndex: "10",

    };

    const triangleShapeStyle = {

        position: "absolute",

        backgroundColor: "#999",

        position: 'absolute',

        top: '-10px',

        left: '50%',

        borderWidth: '3px 3px 3px 3px',

        borderStyle: 'solid',

        borderColor: '#999 transparent transparent transparent',

    };

    return (

        <div onMouseEnter={() => {

                clearTimeout(dialogTimer.current);

                dialogTimer.current = setTimeout(() => 

                    setIsHovered(true), dialogAppearTimeout);

            }}

            onMouseLeave={() => {

                clearTimeout(dialogTimer.current);

                setIsHovered(false);

                dialogTimer.current = null;

            }}

            style={{

                position: "relative",

                display: "inline-block",

                userSelect: "none",

            }}

        >

            {children}

            {isHovered && (

                /* Dialog box starts here*/

                <div style={dialogBoxStyle}>

                    <div style={triangleShapeStyle}/>

                    {textDialog}

                </div>

            )}

        </div>

    );

}

function DatabaseTable({data}) {

    const tableStyle = {

        display: "grid",

        gap: "3px",

        gridTemplateColumns: Array(Object.keys(data && data[0]).length).fill('1fr').join(' '),

        overflowX: "auto",

        width: "calc(100vw - 232px)",

        overflowY: "auto",

        maxHeight: "100vh",

    };

    const headerStyle = {

        background: "#eee",

    };

    const cellStyle = (odd) => {return {

        backgroundColor: odd ? "#bcb" : "#cec",

        display: "flex",

        justifyContent: "flex-end",

    }};

    return (

        <div style={{backgroundColor: "green",}}>

            <div style={tableStyle}>

                {Object.entries(data && data[0]).map(([k,v]) => <strong style={headerStyle}>{String(k)}</strong>)}

                {data.map((x, i) => 

                    { return (

                        <>

                        {Object.entries(x).map(([k,v]) => <div style={cellStyle(i % 2)}>{String(v)}</div>)}

                        </>

                    );})

                }

            </div>

        </div>

    );

}

function FeaturedPage() {

    const exampleDB = [

      {

        "_id": "6551b94e3a4e9b0d6c8f9d0c",

        "username": "CodeNinja123",

        "role": "Developer",

        "isActive": true

      },

      {

        "_id": "6551b94e3a4e9b0d6c8f9d0d",

        "username": "DesignGuru456",

        "role": "Designer",

        "isActive": false

      },

      {

        "_id": "6551b94e3a4e9b0d6c8f9d0e",

        "username": "DataMiner789",

        "role": "Analyst",

        "isActive": true

      },

      {

        "_id": "6551b94e3a4e9b0d6c8f9d0e",

        "username": "DataMiner789",

        "role": "Analyst",

        "isActive": true

      },

      {

        "_id": "6551b94e3a4e9b0d6c8f9d0e",

        "username": "DataMiner789",

        "role": "Analyst",

        "isActive": true

      }

    ];

    return (

        <DatabaseTable data={exampleDB}/>

    );

}

function MainPage() {

    const menu = [

        {label: "Menu", content: <MenuContent />},

        {label: "Settings", content: <SettingsContent />}, 

        {label: "Help", content: <HelpContent />},

        {label: "Featured Content", content: <FeaturedPage/>},

     ];

    const [activeTab, setActiveTab] = useState(0);

    const myStyle = {

        display: "flex",

        alignItems: "flex-start",

        backgroundColor: "#333",

        width: "100vw",

        height: "100vh",

    }

    return (

        <div style={myStyle}>

            <SwitchBoard tabs={menu} activeTab={activeTab} setActiveTab={setActiveTab}/>

            <ActiveContent content={menu[activeTab].content} />

        </div>

    );

}

export default function App() {

    return <MainPage/>;

}

