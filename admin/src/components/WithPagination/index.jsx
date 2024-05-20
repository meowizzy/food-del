import { Pagination } from "../Pagination";
import cls from "./WithPagination.module.css";
import cn from "classnames";

export const WithPagination = ({ loading, setCurrentPage, currentPage, totalPages, children }) => {
    return (
        <>
          <div className={cn(cls.contentWrap, { [cls.loading]: loading })}>
             {children}
             {
                totalPages > 1 && 
                <Pagination 
             currentPage={currentPage}
             totalPages={totalPages}
             setCurrentPage={setCurrentPage}
          />
             }
          </div>
        </>
    );
};