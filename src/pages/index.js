import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { useTheme } from '@material-ui/core/styles';
import SideBar from './../components/SideBar';
import Dashboard from './Overview/DashboardPage/Dashboard';
import WeatherPage from './WeatherPage';
import NewsPage from './NewsPage';
import StockPage from './StockPage';
import UsersPage from './UsersPage';
import useWindowsPathname from './../components/WindowPathname';
import TodoApp from './todo';

const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
        [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const HomePage = (props) => {
    const classes = useStyles();
    const [getPathUrl] = useState(useWindowsPathname()); //useWindowsPathname()
    const { window } = props;
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const container =
        window !== undefined ? () => window().document.body : undefined;

    console.log('0000', getPathUrl.pathname.pathname);

    return (
        <div className={classes.mainContent}>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer} aria-label="mailbox folders">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={
                                theme.direction === 'rtl' ? 'right' : 'left'
                            }
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            <SideBar />
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            <SideBar />
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    {(() => {
                        switch (getPathUrl.pathname.pathname) {
                            case '/overview/dashboard':
                                return <Dashboard />;
                            case '/overview/users':
                                return <UsersPage />;
                            case '/overview/weather':
                                return <WeatherPage />;
                            case '/overview/news':
                                return <NewsPage />;
                            case '/overview/stock':
                                return <StockPage />;
                            case '/overview/todo':
                                return <TodoApp />;
                            default:
                                return <Dashboard />;
                        }
                    })()}
                </main>
            </div>
        </div>
    );
};

export default HomePage;
