import { useState, useEffect, useMemo } from 'react'
import styled, { css } from 'styled-components'
import { useRouter } from 'next/router'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'

export const usePagination = ({
  postPerPageInitial = 18,
  initialCurrentPage = 1,
  data = []
}) => {
  const [currenPage, setCurrenPage] = useState(initialCurrentPage)
  const [postPerPage, setPostPerPage] = useState(postPerPageInitial)

  //Posicion del ultimo post seleccionado
  const indexOfLastPost = currenPage * postPerPage //2* 18 = 36
  //posicion del primer post seleccionado
  const indexOfFirstPost = indexOfLastPost - postPerPage // 36 - 18=18
  //pagina actual
  const newData = data.slice(indexOfFirstPost, indexOfLastPost) //entre la posicion 18 y la 36

  const numberOfPages = useMemo(
    () => Math.ceil(data.length / postPerPage + 1),
    [postPerPage, data.length]
  )

  const getResolution = () => {
    const { width } = window.screen
    return width
  }

  // LOGICA DE LOS BOTONES
  // LOGICA DE LOS BOTONES
  // LOGICA DE LOS BOTONES
  // LOGICA DE LOS BOTONES

  const router = useRouter()
  const pageNumbers = []
  //Calcula los botones que se renderizaran segun la resolucion de pantalla
  const getButtonsPerPage = () => {
    const screen = getResolution()
    if (screen <= 320) {
      setButtonPerPage(2)
    } else if (screen <= 500) {
      setButtonPerPage(4)
    } else if (screen <= 768) {
      setButtonPerPage(5)
    } else if (screen <= 1024) {
      setButtonPerPage(7)
    } else if (screen <= 2560) {
      setButtonPerPage(10)
    }
  }
  //Calcula los botones segun la resolucion de pantalla cuando se navega
  useEffect(() => {
    getButtonsPerPage()
  }, [router.pathname])

  useEffect(() => {
    window.addEventListener('resize', getButtonsPerPage)
    window.onload = function () {
      getButtonsPerPage()
    }
    return () => {
      window.removeEventListener('resize', getButtonsPerPage)
    }
  }, [])

  //Este ciclo crea un array una longitud igual al numero de botones necesarios
  for (let index = 1; index < numberOfPages; index++) {
    const element = index
    pageNumbers.push(element)
  }

  const [currentButtons, setCurrenButtons] = useState(1)
  const [buttonPerPage, setButtonPerPage] = useState(null)
  const indexOfLastButton = currentButtons * buttonPerPage //4*10 =40
  const indexOfFirstButton = indexOfLastButton - buttonPerPage // 40-10= 30
  const Buttons = pageNumbers.slice(indexOfFirstButton, indexOfLastButton) //del 30 al 0

  const handleNextPage = () => {
    setCurrenPage(currenPage + 1)
  }

  const handlePrevPage = () => {
    setCurrenPage(currenPage - 1)
  }

  const handleNextButtons = () => {
    setCurrenButtons(currentButtons + 1)
  }
  const handlePrevButtons = () => {
    setCurrenButtons(currentButtons - 1)
  }
  const ButtonsPagination = () => {
    return (
      <Pages>
        {numberOfPages < 3 ? (
          <div>
            {postPerPage >= data.length ? null : currenPage >= 2 ? (
              <PageEqualTwo onClick={handlePrevPage}>
                <p>Page Prev</p>{' '}
                <span>{currenPage === 1 ? '1' : currenPage - 1}</span>
              </PageEqualTwo>
            ) : (
              <PageEqualTwo onClick={handleNextPage}>
                <p>Page Next</p> <span>{currenPage + 1}</span>
              </PageEqualTwo>
            )}
          </div>
        ) : (
          <div>
            <ButtonGroup>
              <ButtonPrev
                onClick={
                  indexOfLastPost - postPerPage > 0 ? handlePrevPage : null
                }
                disable
              >
                <i>
                  <ArrowLeft activate={indexOfLastPost - postPerPage > 0} />
                </i>
              </ButtonPrev>
              {currentButtons > 1 ? (
                <Page onClick={handlePrevButtons}>...</Page>
              ) : null}

              {Buttons.map(number => (
                <Page
                  activate={currenPage == number}
                  onClick={() => setCurrenPage(number)}
                  key={number}
                >
                  {number}
                </Page>
              ))}
              {indexOfLastButton >= pageNumbers.length ? null : (
                <Page onClick={handleNextButtons}>...</Page>
              )}

              <ButtonNext
                onClick={currenPage < numberOfPages ? handleNextPage : null}
              >
                <i>
                  <ArrowRight activate={currenPage < numberOfPages - 1} />
                </i>
              </ButtonNext>
            </ButtonGroup>
          </div>
        )}
      </Pages>
    )
  }

  return [newData, ButtonsPagination]
}

const PaginationStyle = css`
  width: 50px;
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 15px;
  border-radius: 5px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.lighGray};
  text-align: center;
  :hover {
    background-color: ${({ theme }) => theme.colors.mediumGray};
  }
`
const Pages = styled.div`
  width: auto;
  display: flex;
  justify-content: center;
`

const PageEqualTwo = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  width: auto;

  color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;

  padding: 10px;
  cursor: pointer;
  :hover {
    background-color: ${({ theme }) => theme.colors.mediumGray};
  }

  p {
    margin-bottom: 0;
    display: inline-block;
    font-size: 1rem;
    text-transform: uppercase;
  }
  span {
    display: inline-block;
    margin-left: 5px;
    background-color: black;
    padding: 5px;
    border-radius: 5px;
  }
`
const ButtonGroup = styled.div`
  display: flex;
  gap: 5px;
`

const ButtonPrev = styled.div`
  ${PaginationStyle}
`

const ButtonNext = styled.div`
  ${PaginationStyle}
`
const Page = styled.div`
  ${PaginationStyle}

  ${({ activate }) =>
    activate &&
    css`
      color: white;
      background-color: red;
      :hover {
        background-color: red;
      }
    `}
`

const ArrowLeft = styled(FaArrowLeft)`
  color: ${({ theme }) => theme.colors.lighGray};

  ${({ activate }) =>
    activate &&
    css`
      color: ${({ theme }) => theme.colors.white};
    `}
`

const ArrowRight = styled(FaArrowRight)`
  color: ${({ theme }) => theme.colors.lighGray};
  ${({ activate }) =>
    activate &&
    css`
      color: ${({ theme }) => theme.colors.white};
    `}
`
