function Container({children, className, ...rest}){
    return (
        <div className={`bg-yellow-200 hover:bg-yellow-300 rounded-xl ${className}`} {...rest}>
            {children}
        </div>
    )
}

export default Container;