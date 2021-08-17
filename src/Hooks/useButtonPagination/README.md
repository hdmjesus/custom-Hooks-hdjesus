# useButtonsPagination Hook

Ejemplo de uso:

```
const [Buttons] = useButtonsPagination(
    numberOfPages,
    page,
    isFirstPage,
    isLastPage,
    changePage
  )
```
numberOfPages: Numero de paginas que tendra la paginacion , por lo general sera el Array[].lenght
page: Pagina actual en la paginacion
isFirstPage: Primera pagina de la paginacion
isLastPage: Ultima pagina de la paginacion, numberOfPages.lenght
changePage:Es un metodo para cambiar la pagina actual en la que se encuentra el usuario.


useButtonsPagination retorna Buttons el cual es un componente JSX  ```<Buttons/>```