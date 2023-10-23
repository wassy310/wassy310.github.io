const inScreen = elm => {
    const y = elm.offsetTop - window.scrollY
    return (y + elm.clientHeight) > 0 && window.innerHeight > y
  }

  window.addEventListener('DOMContentLoaded', () => {
    const allArticles = [...document.querySelectorAll('article')]
    const confirmedArticles = new Set()
    const openArticle = article => {
      article.classList.add('active')
    }
    const closeArticle = article => {
      article.classList.add('hide')
      article.addEventListener('animationend', () => {
        article.classList.remove('active', 'hide')
        confirmedArticles.add(article)
        if (allArticles.length === confirmedArticles.size) {
          document.querySelector('.thanks').classList.add('show')
          confirmedArticles.clear()
        }
      }, { once: true })
    }
    const move = direction => {
      const i = allArticles.findIndex(article => article.classList.contains('active'))
      const targetArticle = allArticles[i + direction]
      if (!targetArticle) return
      closeArticle(allArticles[i])
      openArticle(targetArticle)
    }

    // Open and close articles
    const buttons = document.querySelectorAll('.ArticleButton[href="#"]')
    buttons.forEach(button => {
      const article = button.nextElementSibling
      button.addEventListener('click', e => {
        e.preventDefault()
        openArticle(article)
      })
      article.addEventListener('click', e => {
        closeArticle(article)
      })
      article.querySelector('section').addEventListener('click', e => {
        e.stopPropagation()
      })
    })

    // Article Navigations
    const prevNextButtons = document.querySelectorAll('.prev, .next')
    prevNextButtons.forEach(button => {
      button.addEventListener('click', e => {
        e.preventDefault()
        const direction = button.classList.contains('prev') ? -1 : 1
        move(direction)
      })
    })
    const closeButtons = document.querySelectorAll('.close')
    closeButtons.forEach(button => {
      button.addEventListener('click', e => {
        e.preventDefault()
        // nothing to do because parent event will closes the article
      })
    })

    // Controll with keyboard
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        const article = document.querySelector('article.active')
        if (article) closeArticle(article)
      }
      if (e.code === 'ArrowLeft') {
        move(-1)
      }
      if (e.code === 'ArrowRight') {
        move(1)
      }
    })

    // Transitions
    const sections = document.querySelectorAll('body > section')
    window.document.addEventListener('scroll', () => {
      sections.forEach(section => {
        if (!inScreen(section)) return
        [...section.querySelectorAll('.ArticleButton')].reduce((delay, button) => {
          setTimeout(() => button.classList.add('show'), delay)
          return delay + 200
        }, 0)
      })
    })

    // close thanks message
    document.querySelector('.thanks .close').addEventListener('click', e => {
      e.preventDefault()
      document.querySelector('.thanks').classList.remove('show')
    })
  })
