class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  Search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  Filter() {
    const queryCopy = { ...this.queryStr };

    const removeFilter = ["keyword", "page", "limit"];

    removeFilter.forEach((key) => {
      delete queryCopy[key];
    });

    // making filter for price limit and rating
    let queryString = JSON.stringify(queryCopy);
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (key) => `$${key}`
    );
    this.query = this.query.find(JSON.parse(queryString));
    return this;
  }
  Pagination(resultPerPage) {
    const currPage = this.queryStr.page || 1;

    const skip = resultPerPage * (currPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}
module.exports = ApiFeatures;
