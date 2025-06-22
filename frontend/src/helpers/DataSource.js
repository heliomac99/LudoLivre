export class DataSource {
    itens;
    total;
    currentPage;
    pageCount;
    pageSize;
    filters;
    constructor(itens = [], total = 0, currentPage = 1, pageSize = 10, filters = []) {
        this.itens = itens;
        this.total = total;
        this.currentPage = currentPage;
        this.pageCount = Math.ceil(total / pageSize);
        this.pageSize = pageSize;
        this.filters = filters;
    }
}
export var FilterOperator;
(function (FilterOperator) {
    FilterOperator["EQUALS"] = "equals";
    FilterOperator["NOT_EQUALS"] = "notEquals";
    FilterOperator["CONTAINS"] = "contains";
    FilterOperator["GREATER_THAN"] = "greaterThan";
    FilterOperator["LESS_THAN"] = "lessThan";
    FilterOperator["GREATER_THAN_OR_EQUALS"] = "greaterThanOrEquals";
    FilterOperator["LESS_THAN_OR_EQUALS"] = "lessThanOrEquals";
    FilterOperator["IN"] = "in";
    FilterOperator["NOT_IN"] = "notIn";
})(FilterOperator || (FilterOperator = {}));
