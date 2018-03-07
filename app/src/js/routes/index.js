export const routes = [{
    label:"Recipes",
    url:"/recipes",
    sortOrder: 1
},{
    label: "Shopping List",
    url: "/shopping-list",
    sortOrder: 2
},{
    label:"Meal Planner",
    url: "/meal-planner",
    sortOrder:3
}].sort((a,b)=>{
    if(a.sortOrder > b.sortOrder){
        return 1
    }else if(a.sortOrder == b.sortOrder){
        return 0
    }else if(a.sortOrder < b.sortOrder){
        return -1
    }
})