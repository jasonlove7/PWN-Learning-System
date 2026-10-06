void leaf(int n) {
    int local = n + 1;
    (void)local;
}

void parent(void) {
    leaf(10);
}

int main(void) {
    parent();
    return 0;
}
