import { Dispatch, SetStateAction } from "react";

type PaginationProps={
    totalPosts:number,
    postsPerPage:number,
    setCurrentPage: Dispatch<SetStateAction<number>>
}

const Pagination = ({totalPosts,postsPerPage,setCurrentPage}:PaginationProps) => {
    let pages = [];
    for(let i = 1; i<=Math.ceil(totalPosts/postsPerPage); i++){
        pages.push(i);
    }

    return (
    <div>
        <h1>Pagination</h1>
        {
            pages.map((page,index)=>{
                return <button key={index} onClick={()=>setCurrentPage(page)}>{page}</button>
            })
        }
    </div>
  )
}

export default Pagination