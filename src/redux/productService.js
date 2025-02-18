import axios from 'axios';

export const fetchProducts = async (category, page) => {
  try {
    const response = await axios.get('https://dummyjson.com/products', {
      params: {
        limit: 10,
        skip: (page - 1) * 10,
        category: category === 'All' ? '' : category,
      },
    });
    return {
      products: response.data.products,
      total: response.data.total,
      totalPages: Math.ceil(response.data.total / 10),
    };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error fetching products');
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get('https://dummyjson.com/products/categories');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error fetching categories');
  }
};
