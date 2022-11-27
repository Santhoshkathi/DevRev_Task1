import { useState } from 'react'
import booksData from '../../books-data.json'
import styles from './Home.module.css'

const Home = () => {
  const [books, setBooks] = useState(booksData.slice(0, 10))
  const [sort, setSort] = useState('')
  const [length, setLength] = useState(10)
  const [enableLoad, setEnableLoad] = useState(true)

  const loadMoreHandler = (number) => {
    setBooks(booksData.slice(0, Math.min(100, length + number)))
    setLength(Math.max(books.length, length))
    if (length === 100) setEnableLoad(false)
  }

  const searchHandler = (event) => {
    if (event.target.value) {
      setEnableLoad(false)
      setBooks(
        books.filter(
          (book) =>
            book.title.toLowerCase().includes(event.target.value) ||
            book.author.toLowerCase().includes(event.target.value)
        )
      )
    } else {
      setEnableLoad(length < 100)
      loadMoreHandler(0)
    }
  }

  return (
    <div>
      <input
        className={styles.search}
        placeholder='Search'
        onChange={searchHandler}
      />
      <table className={styles.table}>
        <thead>
          <tr>
            <th
              className={styles.th}
              onClick={() => {
                loadMoreHandler(0)
                setSort('')
              }}
            >
              Number
            </th>
            <th className={styles.th}>Cover</th>
            <th className={styles.th} onClick={() => setSort('title')}>
              Title
            </th>
            <th className={styles.th} onClick={() => setSort('author')}>
              Author
            </th>
            <th className={styles.th} onClick={() => setSort('pages')}>
              Pages
            </th>
            <th className={styles.th} onClick={() => setSort('year')}>
              Year
            </th>
          </tr>
        </thead>
        <tbody>
          {sort === ''
            ? books.map((book, index) => (
                <tr key={index}>
                  <td className={styles.td}>{index + 1}</td>
                  <td className={styles.td}>
                    <img
                      className={styles.cover}
                      src={book.imageLink}
                      alt={book.title}
                    />
                  </td>
                  <td className={styles.td}>{book.title}</td>
                  <td className={styles.td}>{book.author}</td>
                  <td className={styles.td}>{book.pages}</td>
                  <td className={styles.td}>{book.year}</td>
                </tr>
              ))
            : sort === 'pages' || sort === 'year'
            ? books
                .sort((a, b) => a[sort] - b[sort])
                .map((book, index) => (
                  <tr key={index}>
                    <td className={styles.td}>{index + 1}</td>
                    <td className={styles.td}>
                      <img
                        className={styles.cover}
                        src={book.imageLink}
                        alt={book.title}
                      />
                    </td>
                    <td className={styles.td}>{book.title}</td>
                    <td className={styles.td}>{book.author}</td>
                    <td className={styles.td}>{book.pages}</td>
                    <td className={styles.td}>{book.year}</td>
                  </tr>
                ))
            : books
                .sort((a, b) => (a[sort] > b[sort] ? 1 : -1))
                .map((book, index) => (
                  <tr key={index}>
                    <td className={styles.td}>{index + 1}</td>
                    <td className={styles.td}>
                      <img
                        className={styles.cover}
                        src={book.imageLink}
                        alt={book.title}
                      />
                    </td>
                    <td className={styles.td}>{book.title}</td>
                    <td className={styles.td}>{book.author}</td>
                    <td className={styles.td}>{book.pages}</td>
                    <td className={styles.td}>{book.year}</td>
                  </tr>
                ))}
        </tbody>
      </table>
      {enableLoad && (
        <button
          className={styles['load-more']}
          onClick={() => loadMoreHandler(10)}
        >
          Load More
        </button>
      )}
    </div>
  )
}

export default Home
