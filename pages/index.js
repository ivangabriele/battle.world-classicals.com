function HomePage() {
  return (
    <main className="page-wrapper">
      <header
        className="header navbar navbar-expand-lg navbar-dark bg-dark navbar-sticky"
        data-scroll-header
        data-fixed-element
      >
        <div className="container px-0 px-xl-3">
          <button
            className="navbar-toggler ms-n2 me-2"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#primaryMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <a
            className="navbar-brand flex-shrink-0 order-lg-1 mx-auto ms-lg-0 pe-lg-2 me-lg-4"
            href="index.html"
          >
            {/* <img
              className="d-none d-lg-block"
              src="img/logo/logo-dark.png"
              alt="Around"
              width="153"
            />
            <img
              className="d-lg-none"
              src="img/logo/logo-icon.png"
              alt="Around"
              width="58"
            /> */}
            WCTB
          </a>
          <div
            className="offcanvas offcanvas-collapse order-lg-2"
            id="primaryMenu"
          >
            <div className="offcanvas-header navbar-shadow">
              <h5 className="mt-1 mb-0">Menu</h5>
              <button
                className="btn-close lead"
                type="button"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav">
                <li className="nav-item dropdown dropdown-mega active">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    data-bs-toggle="dropdown"
                  >
                    Demos
                  </a>
                  <div className="dropdown-menu">
                    <a
                      className="dropdown-column dropdown-column-img bg-secondary"
                      href="index.html"
                      // style="background-image: url(img/demo/menu-banner.jpg);"
                    ></a>
                    <div className="dropdown-column">
                      <a className="dropdown-item" href="index.html">
                        Web Template Presentation
                      </a>
                      <a
                        className="dropdown-item"
                        href="demo-business-consulting.html"
                      >
                        Business Consulting
                      </a>
                      <a
                        className="dropdown-item"
                        href="demo-shop-homepage.html"
                      >
                        Shop Homepage
                      </a>
                      <a
                        className="dropdown-item"
                        href="demo-booking-directory.html"
                      >
                        Booking / Directory
                      </a>
                      <a
                        className="dropdown-item"
                        href="demo-creative-agency.html"
                      >
                        Creative Agency
                      </a>
                      <a className="dropdown-item" href="demo-web-studio.html">
                        Web Studio
                      </a>
                      <a
                        className="dropdown-item"
                        href="demo-product-software.html"
                      >
                        Product Landing - Software
                      </a>
                    </div>
                    <div className="dropdown-column">
                      <a
                        className="dropdown-item"
                        href="demo-product-gadget.html"
                      >
                        Product Landing - Gadget
                      </a>
                      <a className="dropdown-item" href="demo-mobile-app.html">
                        Mobile App Showcase
                      </a>
                      <a
                        className="dropdown-item"
                        href="demo-coworking-space.html"
                      >
                        Coworking Space
                      </a>
                      <a
                        className="dropdown-item"
                        href="demo-event-landing.html"
                      >
                        Event Landing
                      </a>
                      <a
                        className="dropdown-item"
                        href="demo-marketing-seo.html"
                      >
                        Digital Marketing &amp; SEO
                      </a>
                      <a className="dropdown-item" href="demo-food-blog.html">
                        Food Blog
                      </a>
                      <a
                        className="dropdown-item"
                        href="demo-personal-portfolio.html"
                      >
                        Personal Portfolio
                      </a>
                    </div>
                  </div>
                </li>
                <li className="nav-item dropdown dropdown-mega">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    data-bs-toggle="dropdown"
                  >
                    Templates
                  </a>
                  <div className="dropdown-menu">
                    <div className="dropdown-column mb-2 mb-lg-0">
                      <h5 className="dropdown-header">Blog</h5>
                      <a className="dropdown-item" href="blog-grid-rs.html">
                        Grid Right Sidebar
                      </a>
                      <a className="dropdown-item" href="blog-grid-ls.html">
                        Grid Left Sidebar
                      </a>
                      <a className="dropdown-item" href="blog-grid-ns.html">
                        Grid No Sidebar
                      </a>
                      <a className="dropdown-item" href="blog-list-rs.html">
                        List Right Sidebar
                      </a>
                      <a className="dropdown-item" href="blog-list-ls.html">
                        List Left Sidebar
                      </a>
                      <a className="dropdown-item" href="blog-list-ns.html">
                        List No Sidebar
                      </a>
                      <a className="dropdown-item" href="blog-single-rs.html">
                        Single Post Right Sidebar
                      </a>
                      <a className="dropdown-item" href="blog-single-ls.html">
                        Single Post Left Sidebar
                      </a>
                      <a className="dropdown-item" href="blog-single-ns.html">
                        Single Post No Sidebar
                      </a>
                    </div>
                    <div className="dropdown-column mb-2 mb-lg-0">
                      <h5 className="dropdown-header">Portfolio</h5>
                      <a
                        className="dropdown-item"
                        href="portfolio-style-1.html"
                      >
                        Grid Style 1
                      </a>
                      <a
                        className="dropdown-item"
                        href="portfolio-style-2.html"
                      >
                        Grid Style 2
                      </a>
                      <a
                        className="dropdown-item"
                        href="portfolio-style-3.html"
                      >
                        Grid Style 3
                      </a>
                      <a
                        className="dropdown-item"
                        href="portfolio-single-side-gallery-grid.html"
                      >
                        Project Side Gallery (Grid)
                      </a>
                      <a
                        className="dropdown-item"
                        href="portfolio-single-side-gallery-list.html"
                      >
                        Project Side Gallery (List)
                      </a>
                      <a
                        className="dropdown-item"
                        href="portfolio-single-carousel.html"
                      >
                        Project Carousel
                      </a>
                      <a
                        className="dropdown-item"
                        href="portfolio-single-wide-gallery.html"
                      >
                        Project Wide Gallery
                      </a>
                    </div>
                    <div className="dropdown-column mb-2 mb-lg-0">
                      <h5 className="dropdown-header">Shop</h5>
                      <a className="dropdown-item" href="shop-ls.html">
                        Grid Left Sidebar
                      </a>
                      <a className="dropdown-item" href="shop-rs.html">
                        Grid Right Sidebar
                      </a>
                      <a className="dropdown-item" href="shop-ns.html">
                        Grid No Sidebar
                      </a>
                      <a className="dropdown-item" href="shop-single.html">
                        Single Product
                      </a>
                      <a className="dropdown-item" href="checkout.html">
                        Cart &amp; Checkout
                      </a>
                      <a className="dropdown-item" href="order-tracking.html">
                        Order Tracking
                      </a>
                    </div>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    data-bs-toggle="dropdown"
                  >
                    Account
                  </a>
                  <ul className="dropdown-menu">
                    <li className="dropdown">
                      <a
                        className="dropdown-item dropdown-toggle"
                        href="#"
                        data-bs-toggle="dropdown"
                      >
                        Dashboard
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            className="dropdown-item"
                            href="dashboard-orders.html"
                          >
                            Orders
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="dashboard-sales.html"
                          >
                            Sales
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="dashboard-messages.html"
                          >
                            Messages
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="dashboard-followers.html"
                          >
                            Followers
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="dashboard-reviews.html"
                          >
                            Reviews
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="dashboard-favorites.html"
                          >
                            Favorites
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown">
                      <a
                        className="dropdown-item dropdown-toggle"
                        href="#"
                        data-bs-toggle="dropdown"
                      >
                        Account Settings
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            className="dropdown-item"
                            href="account-profile.html"
                          >
                            Profile Info
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="account-payment.html"
                          >
                            Payment Methods
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="account-notifications.html"
                          >
                            Notifications
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="signin-illustration.html"
                      >
                        Sign In - Illustration
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="signin-image.html">
                        Sign In - Image
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="signin-signup.html">
                        Sign In - Sign Up
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="password-recovery.html"
                      >
                        Password Recovery
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    data-bs-toggle="dropdown"
                  >
                    Pages
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="about.html">
                        About
                      </a>
                    </li>
                    <li className="dropdown">
                      <a
                        className="dropdown-item dropdown-toggle"
                        href="#"
                        data-bs-toggle="dropdown"
                      >
                        Contacts
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="contacts-v1.html">
                            Contacts v.1
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="contacts-v2.html">
                            Contacts v.2
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="contacts-v3.html">
                            Contacts v.3
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown">
                      <a
                        className="dropdown-item dropdown-toggle"
                        href="#"
                        data-bs-toggle="dropdown"
                      >
                        Help Center
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="help-topics.html">
                            Help Topics
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="help-single-topic.html"
                          >
                            Single Topic
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="help-submit-request.html"
                          >
                            Submit a Request
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown">
                      <a
                        className="dropdown-item dropdown-toggle"
                        href="#"
                        data-bs-toggle="dropdown"
                      >
                        404 Not Found
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="404-simple.html">
                            Simple Text
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="404-illustration.html"
                          >
                            Illustration
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown">
                      <a
                        className="dropdown-item dropdown-toggle"
                        href="#"
                        data-bs-toggle="dropdown"
                      >
                        Coming Soon
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            className="dropdown-item"
                            href="coming-soon-image.html"
                          >
                            Image
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="coming-soon-illustration.html"
                          >
                            Illustration
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    data-bs-toggle="dropdown"
                  >
                    Docs / UI Kit
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="docs/dev-setup.html">
                        <div className="d-flex align-items-center">
                          <div className="fs-xl text-muted">
                            <i className="ai-file-text"></i>
                          </div>
                          <div className="ps-3">
                            <span className="d-block text-heading">
                              Documentation
                            </span>
                            <small className="d-block text-muted">
                              Kick-start customization
                            </small>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="dropdown-divider"></li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="components/typography.html"
                      >
                        <div className="d-flex align-items-center">
                          <div className="fs-xl text-muted">
                            <i className="ai-layers"></i>
                          </div>
                          <div className="ps-3">
                            <span className="d-block text-heading">
                              UI Kit
                              <span className="badge bg-danger ms-2">50+</span>
                            </span>
                            <small className="d-block text-muted">
                              Flexible components
                            </small>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="dropdown-divider"></li>
                    <li>
                      <a className="dropdown-item" href="docs/changelog.html">
                        <div className="d-flex align-items-center">
                          <div className="fs-xl text-muted">
                            <i className="ai-edit"></i>
                          </div>
                          <div className="ps-3">
                            <span className="d-block text-heading">
                              Changelog
                              <span className="badge bg-success ms-2">
                                v2.3.0
                              </span>
                            </span>
                            <small className="d-block text-muted">
                              Regular updates
                            </small>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="dropdown-divider"></li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="mailto:support@createx.studio"
                      >
                        <div className="d-flex align-items-center">
                          <div className="fs-xl text-muted">
                            <i className="ai-life-buoy"></i>
                          </div>
                          <div className="ps-3">
                            <span className="d-block text-heading">
                              Support
                            </span>
                            <small className="d-block text-muted">
                              support@createx.studio
                            </small>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-dark bg-size-cover overflow-hidden pt-5 pt-md-6 pt-lg-7 pb-5">
        <div className="container position-relative zindex-5 pt-2 pb-4 pb-md-2">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-7 col-md-8 text-center">
              <h1 className="display-4 text-light mb-1">World Classicals</h1>
              <h1 className="display-5 text-light mb-5">Team Battle</h1>
              <div className="d-inline-flex align-items-center mx-1 px-3 mb-4">
                <i className="ai-calendar h2 mb-0 me-2 text-light"></i>
                <span className="text-light">September 11-13, 2020</span>
              </div>
              <div className="d-inline-flex align-items-center mx-1 px-3 mb-4">
                <i className="ai-map-pin h2 mb-0 me-2 text-light"></i>
                <span className="text-light">Lichess</span>
              </div>
              <div className="pt-2">
                <a className="btn btn-success" href="#tickets" data-scroll>
                  Buy Tickets
                </a>
              </div>
            </div>
          </div>
        </div>
        <div data-jarallax-element="50" data-disable-parallax-down="md">
          {/* <img
            className="d-block mx-auto"
            src="img/demo/event-landing/people.png"
            alt="People"
          /> */}
        </div>
      </section>

      <section className="bg-secondary py-5 py-md-6">
        <div className="container py-2 py-md-0">
          <div className="row align-items-center">
            <div className="col-xl-4 text-center text-xl-start">
              <h2 className="mb-4 mb-xl-0">
                New weekly tournament will start in:
              </h2>
            </div>
            <div className="col-xl-8">
              <div
                className="countdown h2 display-2 justify-content-center justify-content-xl-start"
                data-countdown="10/01/2021 07:00:00 PM"
              >
                <div className="countdown-days mb-0 mt-3 me-0 px-4 border-end">
                  <span className="countdown-value fw-normal px-4">0</span>
                  <span className="countdown-label fs-lg text-body">Days</span>
                </div>
                <div className="countdown-hours mb-0 mt-3 me-0 px-4 border-end">
                  <span className="countdown-value fw-normal px-4">0</span>
                  <span className="countdown-label fs-lg text-body">Hours</span>
                </div>
                <div className="countdown-minutes mb-0 mt-3 me-0 px-4 border-end">
                  <span className="countdown-value fw-normal px-4">0</span>
                  <span className="countdown-label fs-lg text-body">Mins</span>
                </div>
                <div className="countdown-seconds mb-0 mt-3 me-0 px-4">
                  <span className="countdown-value fw-normal px-4">0</span>
                  <span className="countdown-label fs-lg text-body">Secs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
