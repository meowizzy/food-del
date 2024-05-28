import { useEffect } from "react";
import { AddCategory } from "./components/AddCategory";
import { SearchCategories } from "./components/SearchCategories";
import { List } from "./components/List";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../pages/Categories/services/fetchCategories";
import { categoriesActions } from "./categoriesSlice";
import { WithPagination } from "../../components/WithPagination";

export const Categories = () => {
    const { data, loading, error, currentPage, search, totalPages } = useSelector(state => state.categoriesReducer);
    const dispatch = useDispatch();

    useEffect(() => {
       dispatch(fetchCategories());
    }, [currentPage, search])

    return (
        <div className="categories add">
            <h3>Categories list</h3>
            <AddCategory/>
            <SearchCategories />
            <WithPagination
              totalPages={totalPages}
              currentPage={currentPage}
              loading={loading}
              setCurrentPage={categoriesActions.setCurrentPage}
            >
              <List
                  data={data}
                  error={error}
              />
            </WithPagination>
        </div>
    );
};