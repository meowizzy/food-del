import cls from "./Empty.module.css";
import cn from "classnames";

export const Empty = ({ className, label }) => {
    return (
        <div className={cn(cls.empty, className)}>
            <div className={cls.emptyIcon}>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    xmlnsXlink="http://www.w3.org/1999/xlink" 
                    version="1.1" x="0px" y="0px" 
                    viewBox="0 0 96 120" 
                    enableBackground="new 0 0 96 96" 
                    xmlSpace="preserve">
                        <g>
                            <polygon 
                                fill="#000000" 
                                points="92.662,64.486 73.232,47 22.768,47 3.338,64.486 0.662,61.514 21.232,43 74.768,43 95.338,61.514     "/>
                        </g>
                        <g>
                            <path 
                                fill="#000000" 
                                d="M90,96H6c-3.309,0-6-2.691-6-6V61h32v2c0,4.963,4.037,9,9,9h14c4.963,0,9-4.037,9-9v-2h32v29   C96,93.309,93.309,96,90,96z M4,65v25c0,1.103,0.897,2,2,2h84c1.103,0,2-0.897,2-2V65H67.847C66.882,71.223,61.488,76,55,76H41   c-6.488,0-11.882-4.777-12.847-11H4z"/></g><g><rect x="23.981" y="20.5" transform="matrix(0.5369 0.8437 -0.8437 0.5369 33.1077 -15.3114)" fill="#000000" width="13.038" height="4"/></g><g><rect x="64.5" y="15.981" transform="matrix(0.8437 0.5368 -0.5368 0.8437 22.4731 -32.1821)" fill="#000000" width="4" height="13.038"/></g><g><rect x="46" y="14" fill="#000000" width="4" height="13"/></g></svg>
            </div>
            <div className={cls.emptyLabel}>
                {label}
            </div>
        </div>
    );
};