const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    const  id = nanoid(16);
    let finished = false;
    const insertAt = new Date().toISOString();
    const updatedAt = insertAt;

 //bila nama kosong
    if (name == undefined || name === ''){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }

 //ketika readpage > pagecount
    if ( readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        });
        response.code(400);
        return response;
    }

 //jika readpage===pageCount
    if (readPage === pageCount){
          finished = true;
    }

    const newBook = {
        id, name, year,author,summary,publisher,pageCount,readPage,reading,finished,insertAt,updatedAt
    };

    books.push(newBook);

    const isSuccess = books.filter((note) => note.id === id).length > 0;

    if (isSuccess){
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'error',
        message: 'Buku gagal ditambahkan'
    });
    response.code(500);
    return response;


    };
const getAllBooksHandler = () => {
//
};
const getBookByIdHandler = (request, h) => {
//
};
const editBookByIdHandler = (request, h) => {
//
};
const deleteBookByIdHandler = (request, h) => {
//
};

module.exports = {addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler};