# usePagination Hook

Ejemplo de uso:

```
 const [newData, ButtonsPagination] = usePagination({
   postPerPageInitial: 18,
   initialCurrentPage: 1,
   data
 })

```
postPerPageInitial: Numero de elementos que queremos que tenga una pagina.
initialCurrentPage: La pagina actual en la que queremos que inicie la paginacion
data: Son los datos que el Hook va a paginar, sera un Array[] de objetos.



usePagination retorna ButtonsPagination el cual es un componente JSX  ```<ButtonsPagination/>```
ademas retorna newData ya paginada para renderizar