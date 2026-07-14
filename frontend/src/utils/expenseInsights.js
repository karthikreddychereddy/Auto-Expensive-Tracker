export function getExpenseInsights(expenses) {

    const today = new Date();

    const todayString = today.toISOString().slice(0,10);

    const yesterday = new Date(today);

    yesterday.setDate(today.getDate()-1);

    const yesterdayString =
        yesterday.toISOString().slice(0,10);

    const todayTotal = expenses
        .filter(e=>e.date===todayString)
        .reduce((sum,e)=>sum+Number(e.amount),0);

    const yesterdayTotal = expenses
        .filter(e=>e.date===yesterdayString)
        .reduce((sum,e)=>sum+Number(e.amount),0);

    const difference = todayTotal-yesterdayTotal;

    const percent = yesterdayTotal===0
        ?100
        :Math.round(
            difference/yesterdayTotal*100
        );

    return{

        todayTotal,

        yesterdayTotal,

        difference,

        percent

    };

}