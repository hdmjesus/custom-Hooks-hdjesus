import { useState, useEffect, useMemo } from 'react'
import styled, { css } from 'styled-components'
import { useRouter } from 'next/router'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'

export const useButtonsPagination = (
  totalPages,
  page,
  isFirstPage,
  isLastPage,
  changePage
) => {
  const router = useRouter()
  const currentUrlPage = router.pathname
  const buttonsNumbers = []

  const getResolution = () => {
    const { width } = window.screen
    return width
  }
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
  for (let index = 0; index < totalPages; index++) {
    const element = index
    buttonsNumbers.push(element)
  }

  const [currentButtons, setCurrenButtons] = useState(1)
  const [buttonPerPage, setButtonPerPage] = useState(null)
  const indexOfLastButton = currentButtons * buttonPerPage //4*10 =40
  const indexOfFirstButton = indexOfLastButton - buttonPerPage // 40-10= 30
  const Buttons = buttonsNumbers.slice(indexOfFirstButton, indexOfLastButton) //del 30 al 0

  const handleNextPage = () => {
    if (isLastPage) {
      return
    }
    changePage(page => page + 1)
    router.push(currentUrlPage)
  }

  const handlePrevPage = () => {
    if (isFirstPage) {
      return
    }
    changePage(page => page - 1)
    router.push(currentUrlPage)
  }
  const handleNumberPage = e => {
    changePage(parseInt(e.target.innerText))
    router.push(currentUrlPage)
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
        {totalPages < 3 ? (
          <div>
            <PageEqualTwo onClick={handlePrevPage}>
              <p>Page Prev</p>
              <span>{`${page - 1}`}</span>
            </PageEqualTwo>

            <PageEqualTwo onClick={handleNextPage}>
              <p>Page Next</p> <span>{page}</span>
            </PageEqualTwo>
          </div>
        ) : (
          <div>
            <ButtonGroup>
              <ButtonPrev onClick={handlePrevPage}>
                <i>
                  <ArrowLeft activate={page > 1} />
                </i>
              </ButtonPrev>

              {currentButtons > 1 ? (
                <Page onClick={handlePrevButtons}>...</Page>
              ) : null}
              {Buttons.map(number => {
                return (
                  <Page
                    activate={page === number + 1}
                    key={number}
                    onClick={handleNumberPage}
                  >
                    {number + 1}
                  </Page>
                )
              })}

              {indexOfLastButton >= buttonsNumbers.length ? null : (
                <Page onClick={handleNextButtons}>...</Page>
              )}

              <ButtonNext onClick={handleNextPage}>
                <i>
                  <ArrowRight activate={page < totalPages} />
                </i>
              </ButtonNext>
            </ButtonGroup>
          </div>
        )}
      </Pages>
    )
  }

  return [ButtonsPagination]
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
