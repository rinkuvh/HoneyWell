import {
  Box,
  FormHelperText,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  OutlinedInput,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextareaAutosize,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  RadioGroup,
  Radio,
  Tabs,
  Tab,
  Switch,
  styled,
  Menu,
  Collapse,
  Stack,
  Pagination,
  SwipeableDrawer,
  Tooltip,
  TablePagination,
  Grid,
  Autocomplete,
  Chip,
  Avatar,
  AvatarGroup,
  Rating,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
  ListItemText,
  ListItemButton
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import moment from "moment";
import momentTimezone from "moment-timezone";
import { Form, Formik, useFormik } from "formik";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";
import * as Yup from "yup";
import { MuiOtpInput } from "mui-one-time-password-input";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // MUI Check Icon
import ErrorIcon from "@mui/icons-material/Error"; // MUI Error Icon
// import MuiPhoneNumber from "mui-phone-number";
import PercentIcon from "@mui/icons-material/Percent";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import { PieChart } from "@mui/x-charts";
import { MobileTimePicker } from "@mui/x-date-pickers";
import {
  Card,
  CardContent,
  Alert,
} from '@mui/material'
export default {
  PercentIcon,
  AttachMoneyIcon,
  // MuiPhoneNumber,
  Formik,
  Yup,
  ErrorIcon,
  CheckCircleIcon,
  MuiOtpInput,
  TimePicker,
  RemoveCircleOutlineIcon,
  AddCircleOutlineIcon,
  moment,
  momentTimezone,

  TablePagination,
  Box,
  FormHelperText,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  VisibilityOff,
  Visibility,
  Link,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextareaAutosize,
  Select,
  MenuItem,
  FormControl,
  RadioGroup,
  Radio,
  Tabs,
  Tab,
  Switch,
  styled,
  Modal,
  Menu,
  ExpandLess,
  ExpandMore,
  Collapse,
  Stack,
  Pagination,
  SwipeableDrawer,
  Tooltip,
  InputLabel,
  Grid,
  AddBoxIcon,
  DisabledByDefaultIcon,
  Autocomplete,
  Chip,
  Avatar,
  AvatarGroup,
  Rating,
  DatePicker,
  DateTimePicker,
  DesktopDatePicker,
  DateRangePicker,
  LocalizationProvider,
  AdapterDayjs,
  DemoContainer,
  useFormik,
  MobileDatePicker,
  dayjs,
  Form,
  toast,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ExpandMoreIcon,
  SmartDisplayOutlinedIcon,
  useNavigate,
  useLocation,
  LinearProgress,
  PieChart,
  MobileTimePicker,
  ListItemText,
  ListItemButton,
  Card,
  CardContent,
  Alert,
};
